# RP_Apparel_Backend

 1)I initially started with **building schemas** for both user and apparel.</br>
 2)motive is to **get some basic details about user and apparel** which they are going to donate/recycle/dispose.</br>
 3)then i started working on **controllers for different features** to include in this application.</br>
 4)The **functionalities in this application include**</br>
   a) The user can SignUp/SignIn with some basic required details. for each login, **a Cookie will be generated** to validate the user authenticity.</br>
   b) Based on the authenticity of the user, different features will be available.</br>
   c) such as, the user will be able to submit a request for Donation/Recycle/Dispose **only when logged in.**</br>
   d) as soon as the user logs out, the corresponding cookie will also be cleared from the client side.</br>
   e) this aslo includes as **automatic cookie expiry of 7 Days**, to make sure that the user claims authorization if not             logged out for 7 days consecutively </br>
5) after completing all the apis creation, i worked on setting up **Routes**</br></br>
6)**To run the backend express code in your local machine,**</br>
you will be required to install the following node modules first.</br>
--type the following line in your terminal in your project directory.</br>
npm i express bcryptjs cookie-parser cors dotenv express-fileupload jsonwebtoken mongoose nodemon validator</br>
