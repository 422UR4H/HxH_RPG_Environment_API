export class OutputCharacterDto {
  id: string;
  userId: string;
  nick: string;
  name: string;
  description: string;
  briefDescription: string;
  birthday: Date;
  avatarUrl: string;
  backgroundImgUrl: string;
  exp?: number;

  // constructor(user: User) {
  //   this.id = user.id;
  //   this.email = user.email;
  //   this.cnpj = user.cnpj;
  //   this.name = user.name;
  //   this.birthday = dateFormat(user.birthday);
  //   this.isPerson = user.isPerson;
  // }
}
