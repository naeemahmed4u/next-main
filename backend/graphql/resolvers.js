const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const { GraphQLUpload } = require("graphql-upload");

const path = require("path");
const express = require("express");

const Asset = require("../models/Asset");
const Site = require("../models/Site");
const Category = require("../models/Category");
const Location = require("../models/Location");
const Department = require("../models/Department");
const { finished } = require("stream");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');


const files = [];


const {
    validateRegisterInput,
    validateLoginInput
  } = require('../util/validators');
  const { SECRET_KEY } = require('../config');
  const User = require('../models/User');
const checkAuth = require("../util/check-auth");
  
  function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

// function generateRandomString(length) {
//     var result = ''
//     var characters =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     var charactersLength = characters.length
//     for (var i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength))
//     }
//     return result
//   }

module.exports = {
    Query: {
        getAssets: async () => {
            return (assets = await Asset.find());
        },

        getSites: async()=>{
            return (sites=await Site.find());
        },

        getSite: async(_,{siteId})=>{
            const site=await Site.findById(siteId);
            if (site){
                return site;
            }else{
                throw new Error('Site not found');
            }                    
        },

        getCategorys: async()=>{
            return (categorys=await Category.find());
        },

        getCategory: async(_,{categoryId})=>{
            const category=await Category.findById(categoryId);
            if (category){
                return category;
            }else{
                throw new Error('Category not found');
            }                    
        },

        getLocations: async()=>{
            return (locations=await Location.find());
        },

        getLocation: async(_,{locationId})=>{
            const location=await Location.findById(locationId);
            if (location){
                return location;
            }else{
                throw new Error('Location not found');
            }                    
        },

        getDepartments: async()=>{
            return (departments=await Department.find());
        },

        getDepartment: async(_,{departmentId})=>{
            const department=await Department.findById(departmentId);
            if (department){
                return department;
            }else{
                throw new Error('Department not found');
            }                    
        },

     
        files: () => files,

        // async getAsset(_, { assetId }) {
        //     const asset = await Asset.findById(assetId);
        //     return asset;
        // },
        uploads: (parent, args) => { },
    },

    Upload: GraphQLUpload,

    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
      
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
      
            const user = await User.findOne({ username });
      
            if (!user) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', { errors });
            }
      
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              errors.general = 'Wrong crendetials';
              throw new UserInputError('Wrong crendetials', { errors });
            }
      
            const token = generateToken(user);
      
            return {
              ...user._doc,
              id: user._id,
              token
            };
          },

          async register(
            _,
            {
              registerInput: { username, email, password, confirmPassword }
            }
          ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
              username,
              email,
              password,
              confirmPassword
            );
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
            // TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if (user) {
              throw new UserInputError('Username is taken', {
                errors: {
                  username: 'This username is taken'
                }
              });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
      
            const newUser = new User({
              email,
              username,
              password,
              createdAt: new Date().toISOString()
            });
      
            const res = await newUser.save();
      
            const token = generateToken(res);
      
            return {
              ...res._doc,
              id: res._id,
              token
            };
          },
          
        async addAsset(_,{assetInput: {picture,description,assetTagID,purchasedFrom,purchaseDate,brand,cost, model,serialNo,site,category,location,department,  depreciableAsset,
          depreciableCost,
          assetLife,
          salvageValue,
          depreciationMethod,
          dateAquired }, }) 
        {
            const newAsset = new Asset({
                picture,
                description,
                assetTagID,
                purchasedFrom,
                purchaseDate,
                brand,
                cost,
                model,
                serialNo,
                site,
                category,
                location,
                department,
                depreciableAsset,
                depreciableCost,
                assetLife,
                salvageValue,
                depreciationMethod,
                dateAquired
            });

            const asset = await newAsset.save();

            return asset;
        },

        async addSite(_,{siteInput:{ site, description, address, city, province, postalCode, Country, },} ) 
        {
            const newSite = new Site({
                site,
                description,
                address,
                city,
                province,
                postalCode,
                Country,
            });
             const site1 = await newSite.save();

            return site1;
        },

        async addCategory(_,{categoryInput:{ category, },} ) // , context
        {
          // const user=checkAuth(context);
            const newCategory = new Category({
                category,
            });
             const category1 = await newCategory.save();

            return category1;
        },

        async addLocation(_,{locationInput:{name, location },} ) 
        {
            // const site = await Site.findById(siteId)
            // if (site) {
            //     site.unshift({
            //         description,
            //     });
            //     await site.save();
            //     return site;                

            const newLocation = new Location({
                name,
                location,
            });
             const location1 = await newLocation.save();

            return location1;
        },

        async addDepartment(_,{departmentInput:{ department, },} ) 
        {
            const newDepartment = new Department({
                department,
            });
             const department1 = await newDepartment.save();

            return department1;
        },

        // uploadFile: async (parent, { file }) => {
        //     const { createReadStream, filename } = await file

        //     const { ext } = path.parse(filename)
        //     const randomName = generateRandomString(12) + ext

        //     const stream = createReadStream()
        //     const pathName = path.join(__dirname, `../images/${randomName}`)
        //     await stream.pipe(fs.createWriteStream(pathName))

        //     return {
        //       url: `http://localhost:5000/images/${randomName}`,
        //     }
        //   },

        // uploadFile: async (_, { file}) => {
        //     const { createReadStream, filename, mimetype, encoding } = await file;

        //     //  const pathName = '../images/'+filename;

        //      const pathName = path.join(__dirname, "../images"+filename)

        //     const stream=createReadStream();

        //     return new Promise((resolve,reject)=>{
        //         const out=fs.createWriteStream(pathName)
        //         stream
        //         .pipe(out)
        //         .on("finished",()=>{
        //             resolve({
        //                 success:true,
        //                 message:"Sucessfully Uploaded",
        //                 mimetype,filename,encoding,location:pathName
        //             })
        //         })
        //         .on("error",(err)=>{
        //             console.log("Error Event Emitted")
        //             reject({
        //                 sucess:false,
        //                 message: "Failed"
        //             })
        //         })

        //     })

        //    },

        uploadFile: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;

            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const pathName = path.join(__dirname, "../images/" + filename);
            const stream = createReadStream();

            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.
            const out = fs.createWriteStream(pathName);
            stream.pipe(out);
            // await finished(out);

            return { filename, mimetype, encoding, location: pathName };
        },
    },
};
