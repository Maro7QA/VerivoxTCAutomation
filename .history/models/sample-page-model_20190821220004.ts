
export interface IPageModel {
  name?: string;
  postalCode: string;
  emailAddress: string;
  gender: string:
  remoteTesting?: boolean;
}

export const pageModel: IPageModel = {
  name: 'john doe',
  postalCode: '90762',
  emailAddress: 'test@test.com',
  gender: 'Herr'
};
