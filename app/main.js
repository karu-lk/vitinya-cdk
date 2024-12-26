#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const stacks_1 = require("../stacks");
const config_1 = require("../config");
const { prefix } = config_1.config;
const app = new aws_cdk_lib_1.App();
new stacks_1.AppsyncServerlessStack(app, `${prefix}-serverless-stack`, {
    env: {
        region: process.env.REGION,
        account: process.env.ACCOUNT,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLDZDQUFrQztBQUNsQyxzQ0FBbUQ7QUFDbkQsc0NBQW1DO0FBRW5DLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxlQUFNLENBQUM7QUFFMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUM7QUFFdEIsSUFBSSwrQkFBc0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLG1CQUFtQixFQUFFO0lBQzVELEdBQUcsRUFBRTtRQUNILE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU07UUFDMUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztLQUM3QjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCB7IEFwcCB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IEFwcHN5bmNTZXJ2ZXJsZXNzU3RhY2sgfSBmcm9tICcuLi9zdGFja3MnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgeyBwcmVmaXggfSA9IGNvbmZpZztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuXG5uZXcgQXBwc3luY1NlcnZlcmxlc3NTdGFjayhhcHAsIGAke3ByZWZpeH0tc2VydmVybGVzcy1zdGFja2AsIHtcbiAgZW52OiB7XG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5SRUdJT04sXG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQUNDT1VOVCxcbiAgfSxcbn0pO1xuXG4iXX0=