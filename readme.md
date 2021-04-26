
# OHM DELIVERY
This is a fictional company minimalistic project that you have to fix and improve.

The company delivers electrical resitances and provides a tracking page to their drivers and customers.

Improve the website to let the user search for the status of a resistance being delivered. When delivered, the driver should be able to acknowledge the delivery (or the failure) of the ordered resistance. 

For this test, the user will receive the following trackingId `1e62adfe`. 


## How to use:
In web and server directories, type:
```bash
npm run start
```

To run the tests, go to the server directory and type:
```
npm run test
```

## Instructions:

### Web:
* Build the search to query the resistance informations and display the status to the customer.
* Allow on the UI for a driver to change the status of a delivery:
	* Status can either be 'DELIVERED' or 'REFUSED'.
	* If the status is 'REFUSED', ask the customer to provide a little piece of text as a failure reason.

### Server:
* Create a new endpoint to manage the status transition.
	* Status has to be one of the followings: 
		* `'CREATED' -> 'PREPARING' -> 'READY' -> 'IN_DELIVERY' -> 'DELIVERED'|'REFUSED'`.
	* A given status can only go to the next state, therefore only one transition is possible per status. Only exception is 'IN_DELIVERY', which can go to to either 'DELIVERED' or 'REFUSED'.
* If a failure reason is provided, save it.


### Perks:
1. Show more info about the customer or display the ohm history.
2. Improve existing code and project architecture as you wish.
3. Allow user to quickly re-order a ohm with the same specifications.
4. Allow the user to add a comment about the delivery.
5. Change the UI as you wish.