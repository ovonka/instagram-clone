class Post {
    constructor(id, username , image, comments) {
        this.id = id;
        this.username = username;
        this.image = image;
        this.comments = [];    
    }
}
 class App {
    constructor(){
         this.posts = []
         this.userId = "";

         this.$app = document.querySelector("#app");
         this.$firebaseAuthContainer = document.querySelector("#firebaseui-auth-container");
         this.$logoutBtn = document.querySelector(".logout-btn");
         this.$authUser = document.querySelector(".auth-user");


         // Initialize the FirebaseUI Widget using Firebase.
         this.ui = new firebaseui.auth.AuthUI(auth);
         this.handleAuth();

         this.addEventListeners();
     }
     handleAuth(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
             this.redirectToApp()
             this.$authUser.innerHTML = user.displayName;
              this.userId = user.uid;
              // ...
            } else {
                this.redirectToAuth();
              // User is signed out
              // ...
            }
          });
     }
     handleLogout(event){
         const isLogoutBtnClickedOn = this.$logoutBtn.contains(event.target);
         if(isLogoutBtnClickedOn) {
             firebase.auth().signOut().then(() => {
                 // Sign-out successful.
                 this.redirectToAuth();
               }).catch((error) => {
                 // An error happened.
                 console.log("ERROR HAS OCCURED", error)
               });
         }
     }
     redirectToApp(){
        this.$firebaseAuthContainer.style.display = "none";
        this.$app.style.display = "block";

     }
     redirectToAuth(){
        this.$firebaseAuthContainer.style.display = "block";
        this.$app.style.display = "none";

        this.ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // Other config options...
          });
     }

     addEventListeners(){
         document.body.addEventListener("click", (event) => {
           this.handleLogout(event)
         })
     }



    
 }
 const app = new App();