
# Subdocument Array Mutation - Prompt

Basic API with a single endpotin to use generateUpdateStatement

If you dont have installed yarn in your machine please follow the next documentation:

- https://classic.yarnpkg.com/en/docs/install/#mac-stable

## Local configuration

1. yarn install*
2. yarn s

## Local Documentation

1. yarn docs
2. Browser: http://localhost:3004

## Run Tests

1. yarn test
## Improvements

1. Improve the logic using reduce and map
2. Validations
	2.1. Validate input fields
		2.1.1.  Validate mutations key
		2.1.2.  Validate multiple origins
	2.2. Validate fields in the objects
	2.3. Validate conflicts (in case there is a creation or update or remove at the 		same time)
3. Add failure unit test cases
4. Create utils in order to add the function **findListKey** and other posible functions there