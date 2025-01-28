# Forminator

## Overview

This project is a dynamic form generator application built with React and TypeScript. It allows users to create, render, and validate dynamic forms based on a raw schema. The application supports conditional rendering, validation, and state management.

## Features

- **Dynamic Form Creation**: Generate forms dynamically based on a raw schema.
- **Validation**: Enforce field requirements using `React Hook Form` and `Yup`.
- **State Management**: Utilize `Zustand` for global state management.
- **Styling**: Built with `Material-UI` (MUI v6) and Emotion.
- **TypeScript**: Fully typed code for better readability and maintainability.
- **Testing**: Unit tests implemented using `React Testing Library (RTL)`.

---

## Installation and Setup

Follow the steps below to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/moodizone/forminator.git
cd forminator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm start
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

### 1. Input Raw Schema

Paste your form schema in the text area. Example schema:

```json
{
  "id": "form1",
  "name": "Sample Form1",
  "elements": [
    {
      "id": "checkbox1",
      "type": "checkbox",
      "label": "Select Options",
      "choices": [
        { "id": "choice1", "name": "Option 1" },
        { "id": "choice2", "name": "Option 2" }
      ]
    },
    {
      "id": "textField1",
      "type": "text",
      "label": "Enter Text",
      "isRequired": true
    }
  ]
}
```

### 2. Rendered Form

The form will dynamically render based on the schema. Example:

- A checkbox with multiple options.
- A required text field.

### 3. Validation

- If a field is marked as `isRequired`, validation will be enforced.
- Errors will be displayed below the fields when the form is submitted without valid input.

### 4. Submission

Upon successful validation, form data will be stored and can be retrieve from sidebar.

---

## Testing

- **Unit Tests**: Written using `React Testing Library` (RTL) to validate components, logic, and conditional rendering.
- Run tests using:

```bash
npm test
```

---

## Deployment

To create a production build, run:

```bash
npm run build
```

The build files will be available in the `build` folder.

---

## License

This project is licensed under the MIT License.
