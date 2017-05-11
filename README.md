# Angular2 Feed Me
A sample Angular 2 app to explore:
* @ngrx/store and @ngrx/effects
* webpack 2
* AOT
* lazy loaded modules
 
## Getting Started 
### Dependencies Prerequisites
Install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `yarn` (`npm install --global yarn`)

### Cloning the repo and installing dependencies
Once you have installed all prerequisites,
* `fork` this repo
* `clone` your fork
* `yarn` or `npm install` to install all dependencies

### Configuring the APIs
This project uses two APIs from [Edamam](https://www.edamam.com/) and [USDA](https://ndb.nal.usda.gov/ndb/).
The project will work even without modifying the current API configuration, for extensive usage you should register for a free dedicated API key:
* [USDA API registration](https://api.data.gov/signup/)
* [Edamam API registration](https://developer.edamam.com/edamam-recipe-api)
Once registerd you can insert your keys on `/src/app/config.ts` or create a `.env` file like the following
```
# EDAMAM API
EDAMAM_APP_ID=your_api_key
EDAMAM_KEY=your_app_key

# USDA API
USDA_API=your_api_key
```
That will be loaded on app startup.

## License
MIT © [damnko](https://github.com/damnko)