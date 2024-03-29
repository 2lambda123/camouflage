import { Request } from "express";

import {
  ValidationConfig,
  ValidationSchemaType,
  ValidationSchema,
  CamouflageConfig,
} from "../ConfigLoader/LoaderInterface";
import { HttpParserResponse } from "../parser/HttpParser";
import logger from "../logger";
import OpenApiAdapter from "./OpenApiAdapter";
import { ValidationResult, ValidationAdapter } from "./ValidationAdapter";
import { getLoaderInstance } from "../ConfigLoader";

export class Validation {
  private static instance: Validation;
  private config: ValidationConfig;
  private adapters: ValidationAdapter[] = [];

  public static create(config: ValidationConfig): Validation {
    this.instance = new Validation(config);
    return Validation.getInstance();
  }

  public static getInstance(): Validation {
    if (!Validation.instance) {
      const config: CamouflageConfig = getLoaderInstance().getConfig();
      return Validation.create(config.validation);
    }
    return Validation.instance;
  }

  private constructor(config: ValidationConfig) {
    this.config = config;
    if (this.config.enable) {
      this.loadSchemas(this.config.schemas);
    } else {
      logger.warn(
        "Validation is disabled. Request and responses are not validated."
      );
    }
  }

  private async loadSchemas(schemas: ValidationSchema[]) {
    for (let x = 0; x < schemas.length; x++) {
      const schema = schemas[x];
      // for now only OpenApi json schemas are supported
      // in the future more types can be added like xml-rpc
      switch (schema.type) {
        case ValidationSchemaType.OpenApi:
          // eslint-disable-next-line no-case-declarations
          const adapter = new OpenApiAdapter(schema);
          await adapter.load();
          this.adapters.push(adapter);
          break;
        default:
          logger.warn(
            `Unsupported schema type ${schema.type} for ${schema.url}`
          );
          break;
      }
    }
  }

  validateRequest(req: Request): ValidationResult {
    const adapters = this.adapters.filter((adapter) =>
      adapter.supportsRequest(req)
    );
    for (let x = 0; x < adapters.length; x++) {
      const adapter = adapters[x];
      const result = adapter.verifyRequest(req);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true };
  }

  validateResponse(
    req: Request,
    response: HttpParserResponse
  ): ValidationResult {
    const adapters = this.adapters.filter((adapter) =>
      adapter.supportsRequest(req)
    );
    for (let x = 0; x < adapters.length; x++) {
      const adapter = adapters[x];
      const result = adapter.verifyResponse(req, response);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true };
  }
}
