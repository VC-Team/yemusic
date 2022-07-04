declare namespace Express {
  type Tuser = {
    _id: string;
  };

  export interface Request {
    user?: Tuser;
  }
}
