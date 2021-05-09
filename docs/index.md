# Home

<img src="camouflage.png" alt="camouflage.png" width="300"/>

Camouflage is a service virtualization tool inspired by [namshi/mockserver](https://github.com/namshi/mockserver){target=\_blank}. As the original description says, the mocking/service virtualization works on a file based structure where _you simply organize your mocked HTTP responses in a bunch of mock files and it will serve them like they were coming from a real API; in this way you can write your frontends without caring too much whether your backend is really ready or not._

## Why did we create Camouflage if a similar tool already exists?

Camouflage simply borrows the idea from the original and though it does use some of the same logic and functions, majority of the code has been written from scratch implementing a plethora of amazing new features.

1. The underlying codebase has been re-written using typescript providing a structured, strongly typed, modular codebase.
2. Some features from the original tool might be missing, or have been implemented differently. (import and eval have not been ported to Camouflage)
3. Camouflage introduces handlebars, which allows you to generate dynamic (more real) responses.
4. Using handlebars, you can generate random numbers, strings, alphanumeric strings, UUIDs and random dates.
5. You can also extract information from request queries, path, body or headers and use them in your response.
6. You can use handlebars to carry out request matching for you. For example, return one response if a query param exists, return another if it doesn't.
7. Camouflage supports multiple protocols, i.e. HTTP, HTTPs, HTTP2 and gRPC.
8. Camouflage provides inbuilt support for creating backups and restoring from backups in case something goes wrong.
9. Camouflage provides support for monitoring.

Head on over to the Getting Started page and set up your first Camouflage project.