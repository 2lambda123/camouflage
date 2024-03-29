import { ThriftConfig } from "../protocols/Thrift";
import { SoapConfig } from "../protocols/Soap";

export interface CamouflageConfig {
  loglevel: "debug" | "info" | "warning" | "error";
  cpus: number;
  monitoring: MonitoringConfig;
  ssl: SSLConfig;
  protocols: Protocols;
  backup: BackupConfig;
  cache: CacheConfig;
  injection: InjectionConfig;
  ext_helpers?: string;
  origins?: string[];
  validation?: ValidationConfig;
}

interface MonitoringConfig {
  port: number;
}

interface SSLConfig {
  cert: string;
  key: string;
  root_cert?: string;
}

interface Protocols {
  http: ProtocolConfig;
  https: ProtocolConfig;
  http2: ProtocolConfig;
  ws: ProtocolConfig;
  grpc: ProtocolConfig;
  thrift: ThriftProtocolConfig;
  soap: SoapProtocolConfig;
}

interface ProtocolConfig {
  enable: boolean;
  port: number;
  mocks_dir?: string;
  host?: string;
  protos_dir?: string;
  grpc_tls?: boolean;
}

interface ThriftProtocolConfig {
  enable: boolean;
  mocks_dir: string;
  services: ThriftConfig[];
}

interface SoapProtocolConfig {
  enable: boolean;
  port: number;
  mocks_dir: string;
  services: SoapConfig[];
}

interface BackupConfig {
  enable: boolean;
  cron: string;
}

interface CacheConfig {
  enable: boolean;
  ttl_seconds: number;
  cache_options?: Record<any, any>;
}

interface InjectionConfig {
  enable: boolean;
}

export interface ValidationConfig {
  enable: boolean;
  schemas: ValidationSchema[];
}

export enum ValidationSchemaType {
  OpenApi = "OpenApi",
}

export interface ValidationSchema {
  type: ValidationSchemaType;
  url: string;
}
