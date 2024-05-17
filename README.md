# DJS04 Project Brief: Book Connect Application - Web Components

## Overview

The **Book Connect Application** allows users to browse and filter a list of books. This project builds upon the previous DJS03 project by incorporating Web Components to enhance modularity and reusability. The primary focus is on transforming the book preview functionality into a reusable Web Component, as well as identifying and converting other potential components within the application.

## Objective

Transform the book preview functionality of the "Book Connect" application into a fully operational Web Component. Evaluate and potentially convert other parts of the application into Web Components to enhance modularity and reusability.

![alt text](image.png)

## Goals

1. **Convert Book Preview to Web Component**: Encapsulate the book preview feature into a Web Component, making it reusable and independent.
2. **Assess Other Components**: Identify other elements within the "Book Connect" app that could benefit from being converted into Web Components.
3. **Maintain Functionality**: Ensure that the application retains all its current functionalities after refactoring.

## Tasks

### 1. Understand the Existing Codebase

- Familiarize yourself with the current structure and functionality of the "Book Connect" project, focusing on the book preview feature.

### 2. Create a Web Component for Book Preview

- Encapsulate the book preview into a Web Component.
- Ensure that the component is self-contained, with its own HTML, CSS, and JavaScript.
- Test the component to ensure it works seamlessly within the app.

### 3. Identify and Convert Other Components

- Analyze the application to identify other potential components for conversion.
- Prioritize components based on their reusability and importance to the app.
- Convert the chosen elements into Web Components.

### 4. Testing and Integration

- Rigorously test the new components individually and within the context of the application.
- Pay special attention to interactions between components and the overall user experience.

### 5. Documentation

- Document the process of creating the Web Components.
- Include any challenges faced and how they were overcome.
- Provide a clear guide on how the components should be used within the app.

## Discussion and Reflection

Prepare to discuss your experience with your coach, focusing on:

- Challenges encountered while converting the book preview and other elements into Web Components.
- The rationale behind selecting certain elements for conversion into Web Components.
- Insights gained about the advantages and limitations of using Web Components in web development.

## Submission Guidelines

Submit your updated "Book Connect" codebase, including all the newly created Web Components. Ensure your code is well-commented and adheres to best practices for Web Component development. Include a detailed report covering your process, challenges, and reflections on working with Web Components.

## Project Setup and Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd book-connect
   ```
3. Open `index.html` in your preferred web browser to view the application.

## Usage Guide

### Book Preview Web Component

To use the `book-preview` component in your HTML, include the following tag:

```html
<book-preview
  data-author="authorId"
  data-id="bookId"
  data-image="imageUrl"
  data-title="bookTitle"
></book-preview>
```

### Functions and Event Handlers

- **Initialize App**: Initializes the application on `DOMContentLoaded`.
- **Render Book Previews**: Renders book previews using the `book-preview` component.
- **Handle Theme Change**: Handles theme changes (day/night mode).
- **Filter Books**: Filters books based on user input.
- **Show More Books**: Loads more books when the "Show More" button is clicked.
- **Handle Book Preview Click**: Displays detailed information about the selected book.

## Detailed Report

- **Process**: Detailed steps on creating Web Components and integrating them into the application.
- **Challenges**: Issues faced during the conversion process and how they were resolved.
- **Reflections**: Insights gained about using Web Components, their advantages, and limitations.

For further details, refer to the comments within the codebase and the detailed report included in the submission.
