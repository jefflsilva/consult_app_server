export class UseInputDTO {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public confirmPassword: string
  ) {}
}
