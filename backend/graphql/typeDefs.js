const { ApolloServer, gql } = require("apollo-server-express");


const files = [];

module.exports = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    location: String!
  }

  type Asset {
    id: ID!
    picture: String
    description: String
    assetTagID: String
    purchasedFrom: String
    purchaseDate: String
    brand: String
    cost: String
    model: String
    serialNo: String
    site:String
    category:String
    location:String
    department:String
    depreciableAsset:String
    depreciableCost:String
    assetLife:String
    salvageValue:String
    depreciationMethod:String
    dateAquired:String

  }

  type Site {
    id: ID!
    site: String
    description: String
    address: String
    city: String
    province: String
    postalCode: String
    country: String
  }

  type Category {
    id: ID!
    category: String
  }

  type Location {
    id: ID!       
    name:String   
    location: String
  }

  type Department {
    id: ID!
    department: String
  }

  input DepartmentInput {    
    department: String
  }

  input LocationInput {    
    name:String
    location: String
  }

  input CategoryInput {    
    category: String
  }

  input SiteInput {    
    site: String
    description: String
    address: String
    city: String
    province: String
    postalCode: String
    country: String
  }
  input AssetInput {
    picture: String
    description: String
    assetTagID: String
    purchasedFrom: String
    purchaseDate: String
    brand: String
    cost: String
    model: String
    serialNo: String
    site:String
    category:String
    location:String
    department:String
    depreciableAsset:String
    depreciableCost:String
    assetLife:String
    salvageValue:String
    depreciationMethod:String
    dateAquired:String
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    files: [File!]

    getAssets: [Asset]
    getAsset(assetId: ID!): Asset

    getSites:[Site]
    getSite(siteId: ID!): Site

    getCategorys:[Category]
    getCategory(categoryId: ID!): Category

    getLocations:[Location]
    getLocation(locationId: ID!): Location

    getDepartments:[Department]
    getDepartment(departmentId: ID!): Department

    uploads: [File]
    otherFields: Boolean!
  }
  type Mutation {
    addSite(siteInput:SiteInput!):Site!
    addCategory(categoryInput:CategoryInput!):Category!   
    addLocation(locationInput:LocationInput!,):Location!
    addDepartment(departmentInput:DepartmentInput!):Department!
    addAsset(assetInput: AssetInput): Asset
    uploadFile(file: Upload!): File!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
