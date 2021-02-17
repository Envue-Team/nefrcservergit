# Joe log


# 2/3/2021

## Changes
* router.js
* Users.vue

# router.js
In ``router.js``, changed

```Javascript
    {
      path: '/users',
      name: 'users',
      component: function() {
        if (this.$session.get("userRole") == 1) {
          return Users;
        }
      }
    },
```

Into

```Javascript
    {
      path: '/users',
      name: 'users',
      component: Users 
    },
```

Because the __``this.$session.get("userRole") == 1``__ kept returning unknown.

Instead modified the ``Users.vue`` page as follows below. 

<br>

# Users.vue

Added the ``checkAdmin()`` function to the ``Users.vue`` page

 __checkIfAdmin()__
```Javascript
    checkIfAdmin() {
      let userRole = this.$session.get("userRole");
      if (userRole != "1") {
        this.$router.replace({ name: "home" });
      }
    }
```
Then added it to the ``mounted()`` function.

# Home.vue

Added the following:

```Javascript
<router-link class="text-h4 grey--text text--darken-2" to="/userpage"> | Profile Page</router-link>
```



# TODO

There are conflicts between App.vue and Home.vue where Home.vue takes priority so other things from App.vue are not populated.