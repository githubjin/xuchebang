/**
 * @flow
 */
export type PageInfo = {
  currentPage: number,
  orderBy: any,
  pageCount: number,
  pageSize: number,
  rowCount: number,
  totalCount: number
};
export type BrandsMinPrice = {
  brandName: string,
  id: number,
  imgUrl: string,
  minPrice: number,
  price: number
};

export type Picture = {
  height: number,
  path: string,
  thumbnailPath: string,
  width: number
};

export type Comment = {
  actualPrice: number,
  alreadyThumbuped: boolean,
  cityId: number,
  commentCount: number,
  commentDate: number,
  content: string,
  firstLevelCarType: string,
  fullCarType: string,
  id: number,
  marketPrice: number,
  nickname: string,
  pictures: Picture[],
  portrait: string,
  savePrice: number,
  score: number,
  shopName: string,
  shopValid: boolean,
  storeId: number,
  thirdLevelCarType: string,
  thumbupCount: number
};

export type StoreImage = {
  imgDes: string,
  imgUrl: string
};
export type ServiceNetType = {
  activeBrandId: string,
  activeFactoryId: string,
  address: string,
  brandImages: string[],
  brandOfStore: string[],
  brandTypeId: string,
  canNotServerRepairItem: string,
  canNotServerWashItem: string,
  carBrandTypeId: string,
  carBrandTypeIds: number[],
  closeTimeStr: string,
  dayOfWeek: string,
  deleted: boolean,
  discountValueMin: number,
  distance: number,
  effectDateStr: string,
  groupId: number,
  id: number,
  isCrossBrand: number,
  isUsePrivateVoucher: number,
  itemList: Object[],
  latBd: string,
  latGd: string,
  loacationId: number,
  lonBd: string,
  lonGd: string,
  openTimeStr: string,
  oriPrice: number,
  overallScoreAvg: number,
  persons: number,
  placeId: number,
  repairItemList: Object[],
  serviceItems: Object[],
  serviceScoreAvg: any,
  serviceTypes: number[],
  shopDesc: string,
  speedyScoreAvg: any,
  storeImages: StoreImage[],
  storeName: string,
  storeNamePy: string,
  storeNickName: string,
  storeOriginalImages: string[],
  storeType: number,
  telephone: string,
  timePrices: number,
  washItemList: Object[]
};
