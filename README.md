# CartonCloud React Coding Test

## Task

You have been given a story by the Project Manager to build a form that will
allow users to create a breakdown of a product which is an assembly of other
products.

---

### Ticket REACT-1234 - Story

**Stakeholders**

*Administrators*: Want to be able to describe what one of their composite
products is made of using other existing products in the system.

*Administrators*: Want to be able to list all the Composite Products that exist in the system.

**Context**

Users of the system may stock products that are actually just a composite of
existing products in their warehouse. The warehouse may have a table product in
stock which is actually 1x Benchtop, 4x Leg, 12x M10 30mm bolts.

**Feature**

Create a React Application, the details of the features are below.

Build a basic list view that displays all Composite Products in the system. Clicking
on one should take the user to a screen where the user can edit it and save it.

Build an add+edit form which lets users create a new or edit an existing Composite Product.

The add+edit form allows the user to:

1. Name their Composite Product

2. Add Products and Groups to the Composite Product.

    - Product

        - Contains a **required** select input to choose a Product that exists in the system.

        - Contains a **required, positive, integer** input to enter the Quantity.

    - Group

        - Contains an optional text input titled 'Group Label'

        - Contains a way to let the user add more Products and Groups beneath it.

3. Remove any Product or Group from the Composite Product.

Mockups of Example 1, Example 2, and Example 3 show a wireframe of what the form may look
like for those examples.


**Acceptance Criteria**

- The list view displays all Composite Products that exist.

- Example 1, Example 2, Example 3 are all visually simlilar to the mockups in shape.

- Example 1, Example 2, Example 3 are all presented correctly in the form and can be edited freely and saved.

- New Composite Products can be created and edited by a user.

- There is no limit to how deeply nested a Composite Product's Groups can be.

- Automated tests for your components.

- The Save button background colour is #32a852.

- The Cancel button background colour is #bf2d22.

- The Select input for the Product section on the form has an option for every Product in the system at (`GET /products`)

- Client side validation described in Feature section is respected.

- The React view `/composite-products` shows a list of all Composite Products in React

- There is a button on the list page to go to the add view.

- Clicking on a Composite Product in the list view goes to the edit view for that item.

- The React view `/composite-products/add` shows an empty add form to create a new Composite Product and save it.

- The React view `/composite-products/:uuid` shows the Composite Product with that UUID and allows the user to edit and save it.

- The cancel button on the add and edit views returns the user back to the list view.

---

# Related data structures that may help you

```
class ComponentProduct {
  type: "PRODUCT";
  productId: string;
  quantity: number;
}
```

```
class ComponentGroup
{
  type: "GROUP";
  label: string,
  components: (ComponentGroup|ComponentProduct)[]
}
```

```
class CompositeProduct {
  name: string;
  components: (ComponentProduct | ComponentGroup)[];
}
```

```
// JSON payloads expected to work in the form
{
  "name": "Example 1",
  "components": [
    {
      "type": "PRODUCT",
      "quantity": 1,
      "productId": "ba7a0995-4193-4589-8150-54a3cef5f2c6"
    }
  ]
}

{
  "name": "Example 2",
  "components": [
    {
      "type": "GROUP",
      "label": "Nut and Bolt set",
      "components": [
        {
          "type": "PRODUCT",
          "quantity": 1,
          "productId": "990650ee-ee52-449c-b53e-b55260ff8734"
        },
        {
          "type": "PRODUCT",
          "quantity": 1,
          "productId": "172cc52d-8259-461d-bcf0-72b8e1390450"
        }
      ]
    }
  ]
}

{
  "name": "Example 3",
  "components": [
    {
      "type": "PRODUCT",
      "quantity": 1,
      "productId": "ba7a0995-4193-4589-8150-54a3cef5f2c6"
    },
    {
      "type": "PRODUCT",
      "quantity": 4,
      "productId": "7d5350b9-65d9-4c0f-9ebb-cc18103325a8"
    },
    {
      "type": "GROUP",
      "label": "Legs",
      "components": [
        {
          "type": "PRODUCT",
          "quantity": 4,
          "productId": "94daaf0b-ec73-4052-aba0-9b0c5d502417"
        },
        {
          "type": "GROUP",
          "label": "Fasteners",
          "components": [
            {
              "type": "PRODUCT",
              "quantity": 12,
              "productId": "990650ee-ee52-449c-b53e-b55260ff8734"
            },
            {
              "type": "PRODUCT",
              "quantity": 12,
              "productId": "172cc52d-8259-461d-bcf0-72b8e1390450"
            }
          ]
        }
      ]
    }
  ]
}
```

# API Endpoints

### Note:
Composite Products you create do not persist between server restarts.

## GET /products
Returns a complete list of all Products in the system.

## GET /composite-products
Returns a complete list of all Composite Products in the system.

## POST /composite-products
Saves the supplied Composite Product into the system.

## PUT /composite-products/:uuid
Updates the matching Composite Product in the system with the supplied data.

## GET /composite-products/:uuid
Returns the matching Composite Product in the system if it exists.

---

## Instructions and final notes

### To start api_server 
In the api_server folder, `npm install` and then `npm run start`. This will run on Port 3000 by default.
Treat the api_server as a black box, please avoid modifying it.

Put your React app in the webapp folder.

### Do your best.

We work with Typescript, React and Redux so using those is preferred.
**However**, you're welcome to use your own judgement to pick modules and tools that work for you. Using different modules won't disqualify you.

Incomplete projects are still accepted, do your best to show your skills. An attempt at
a feature (even incomplete) in the Story will always be scored higher than a `//TODO` comment.

What we're looking at:

- How you deal with nested forms that change as the user interacts with the UI.

- How you structure your project files.

- How you structure your components.

- How you fulfill acceptance criteria.

- How you deal with automated tests.
