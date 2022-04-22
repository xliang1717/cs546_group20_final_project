## Regression Test

### Instruction for testing myCollection

* Run ```npm run seed ``` You should see a log message
```User this link to test myCollection: http://localhost:3000/myCollection/XXXX```
* Run ```npm run start ```
* Copy the above link in the log message to view the myCollection page for user
* You can also do "Cancel Collection" action or click "Back to Home" button to redirect to Home page.

### Instruction for testing user detail page including myArea

* Use same userId to open user detail page ```http://localhost:3000/user/XXXX```
* You will be able to view myArea in user page

### Instruction for testing my parking lot page which shows all parkign lots uploaded by this user

* User this link to test myParkingLots page:  ```http://localhost:3000/myParkingLots/XXXX```
* You can click "View" button to view parking lot with the parkinglot ID
* You can navigate to this page from user detail page's "Add New Parking Lot" button

