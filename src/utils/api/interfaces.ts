import { DomainUser } from "../../models/domain/User";
import { CreateUpdateUser } from "../../models/domain/CreateUpdateUser";

export type RequestOptions<Body> =
    | {
          method: "get" | "delete";
          url: string;
          authHeader?: Record<string, string>;
      }
    | {
          method: "post" | "put";
          url: string;
          authHeader?: Record<string, string>;
          body?: Body;
      };

export type ApiRoutes = {
    user: {
        get: () => Promise<DomainUser>;
        post: (user: CreateUpdateUser) => Promise<DomainUser>;
        put: (user: CreateUpdateUser) => Promise<DomainUser>;
    };
};
