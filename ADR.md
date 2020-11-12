#  Architectural Design Decisions:

  

##  AgGrid, Column Freezing and Column Filter functionality:

*  **Summary**: In order to add in the ability to freeze columns when horizontally scrolling in the caseload management view, we determined that it was both possible and most practical to iterate on the current use of the JavaScript library, ag-Grid. ag-Grid also allows for column wise filtering and sorting functionality that is currently implemented, however, the user experience can be flexibly improved through further customization options using ag-Grid.

* **Problem**: The current implementation of ag-Grid in the caseload management view of the Counselor Portal allows users to view a limitless number of columns associated with student data, similar to a large Excel file. However, if there is a column of particular interest, for instance, GPA, a user cannot scroll through their data horizontally and keep the GPA for each student in view when trying to access an unseen column like ‘Reach School(s)’. A user therefore needs to be able to freeze high interest column(s) so that they can more efficiently and impactfully examine student data.
Additionally, the filtering and sorting feature available at each column head require tweaking for improvised functionality and user experience. When filtering by certain values at the head of a column, the current implementation often becomes convoluted and difficult to follow. The UI of the filter and sort functions is not overly self-guiding either.

  

*  **Constraints**: Nothing is constraining our use of ag-Grid other than the fact that this app, especially the caseload management view, is deeply structured using this library.

* **Options**: There are no candidate solutions at present as ag-Grid captures the needs of the current goal.

* **Rationale**: ag-Grid contains a multitude of features that have yet to be implemented and should not be constraining in any way down the road. The app already relies heavily on ag-Grid which provides an in-depth library for populating, reading, and downloading data from its grid view. Additionally, the logic required to compute column-wise filtering and sorting is provided by this library so implementation falls almost entirely on the front end.

## Stripe, Payment Processing System

* **Summary** - In order to process payments securely, we decided to use Stripe as an iframe in combination with Firebase.

* **Problem** - One of the main features the client desires is payment processing capabilities. When processing payments there are legal requirements for any company that processes, stores or transmits credit card information, called PCI compliance. Besides the legal concerns, it is also important that the way we process payments is secure on principle, to protect the users that are trusting Easy Access with their sensitive information.

* **Constraints**. The main constraint is the difficulty of achieving PCI compliance with our experience level during this semester without using a 3rd party credit card processing company. Another assumption that is key to consider is if the client is willing to pay extra to ensure security and PCI compliance.

* **Options** - The two options are to write our own code to store and charge credit card information for free or pay a 3rd party software company to handle that data for us and send a token to Firebase. There are many 3rd party software companies that handle credit card processing because the PCI requirements are quite stringent and businesses rarely write their own code for payment processing. The pros of this option are it ensures Easy Access will be PCI compliant and it saves time for us. The con is that it may be difficult to have different levels of authorization if the only information the 3rd party software gives us is a payment token we can use to charge the user’s card. We will have to be creative. The pro of writing our own code is that we have control over which users have paid and are authorized to access premium tiers. The con is that it would be nearly impossible for us to successfully write PCI compliant processes in the given time frame.
There are two options when using Stripe for payment processing: using a Stripe iframe, called Stripe Elements, and using Stripe Billing API. The pros of using Stripe Elements are that it is the simplest form of PCI compliance and will auto-generate Self Assessment Questionnaire (SAQ A) documentation. Additionally, Stripe Elements has built-in input validation, formatting, masking, styling and error handling. The cons are that Stripe Elements doesn’t include recurring billing and that has to be handled separately. The pros of the Stripe Billing API is that it support more than just cards using local payment methods and supports recurring billing. The con is that it is not as simple to setup or to create a unified UI with the Easy Access UI.

* **Rationale** - We chose to use the Stripe Elements for initial payment processing and Stripe Billing API for recurring billing because it capitalizes on the strengths of each service to allow Easy Access abide by legal requirements and secure their user’s data.

## Cloud Firestore, Securing User Data

* **Summary**: To strike the right balance between convenience and security when it comes to storing user data, we decided the best course of action was to stick with the already implemented database in Cloud Firestore. With the “rules” feature found in all of Firebase’s various storage products, making sure that data can only be accessed by properly authorized users is relatively simple, both to implement and to understand, yet powerful enough to keep user data safe.

* **Problem**: Nearly all rules present for the Cloud Firestore database exist in their default configuration, meaning there are no restrictions on writing or reading from any stored objects. This is of course a glaring security concern and could result in attackers accessing data that is not theirs via querying with a valid object token that they don’t own. Objects need to be restricted to their token and associated user ids. Rules need to be properly set to ensure that only uploaders of the data, and other users they have deemed authorized can access their data. However whatever rules are put in place still need to allow the site to function as intended. These rules need to be clear, easy to understand, and in line with at least basic security principles that align with the use case of the Easy Access Counselor Portal product. Ideally these rules would be future proof, or at the very least, easy to work with and modify should they end up not being future proof.

* **Constraints**: Moving to a different database would cost both time and money that would drastically reduce our ability to work on other areas of the project so ideally we need to be able to secure the current database, preferably as is. We need to make sure whatever security measures are put in place still allow the site to function as it is currently implemented as a repo wide refactoring would be far too costly timewise.

* **Options**: Use the security features already implemented into Cloud Firestore or move to a different database that is possibly more in line with our security needs.

* **Rationale**: Firestore is the obvious choice here, it has more than enough security features to satisfy our needs, the data is all already there anyway, and Firestore being a popular and well known, well supported product has plenty of documentation and resources to make use of its security features easy and accessible. The “rules” feature possible combined with the “functions” feature is more than enough to secure our users data.
