# Math Web Application


[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/whsalazar-org/copilot-demo/actions)

----

This is a simple Node.js Express application named "math-web" that provides an endpoint to add two numbers. The application is structured to separate concerns, with the math logic and routing handled in different files.

## Project Structure

```
math-web
├── src
│   ├── app.ts          # Entry point of the application
│   ├── math.ts         # Contains the math functions
│   └── routes
│       └── index.ts    # Defines the application routes
├── test
│   ├── math.test.ts    # Unit tests for math functions
│   └── routes.test.ts   # Unit tests for routes
├── package.json         # npm configuration file
├── tsconfig.json        # TypeScript configuration file
└── README.md            # Project documentation
```

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd math-web
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run the following command:

```
npm start
```

The application will be available at `http://localhost:3000`.

## API Endpoint

### Add Two Numbers

- **Endpoint**: `/add`
- **Method**: `GET`
- **Query Parameters**:
  - `num1`: The first number to add.
  - `num2`: The second number to add.

#### Example Request

```
GET /add?num1=5&num2=10
```

#### Example Response

```json
{
  "result": 15
}
```

## Testing

To run the unit tests, use the following command:

```
npm test
```

This will execute the tests defined in the `test` directory, ensuring that the math functions and routes work as expected.

## Continuous Integration

This repo includes CI for both GitHub Actions and Jenkins.

- GitHub Actions: `.github/workflows/ci.yml`
  - Triggers on push/PR to `main`/`master`
  - Uses Node `20`, caches npm, runs `npm ci` and `npm test`

- Jenkins: `Jenkinsfile`
  - Declarative pipeline with Docker agent `node:20`
  - Stages: Checkout → Install (`npm ci`) → Test (`npm test`)

### Enabling CI

- GitHub: Push the repository; actions run automatically. View runs under the Actions tab.
- Jenkins: Create a Pipeline job with “Pipeline script from SCM”; Jenkins will discover and run the `Jenkinsfile`.

### Badges (optional)

Once connected to GitHub Actions/Jenkins, you can add badges here to show CI status.

## License

This project is licensed under the MIT License.