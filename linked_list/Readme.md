# LLN - Linked List Network

## Network Map

### The Map Model or Network Map -

The format of _Map Model_ or _Network Map_ will be as follows -

    const mapModel = [
    {
        list_Id: null,
        node_List: [{
            node_Id: null,
            node_Type: {
                type: 'single',
                reference: null,
            },
            node_Data: null,
        },]
    },];

## Process of Making Network

### 1. Draw your Network.

Before doing anything draw your network diagram on a paper so that you get some idea about your diagram like number
linked list, number nodes inside a linked list and their types.

### 2. Create Map Model or Network Map Array.

Using the format above write you map model, all you have to do is two follow the array model above. Each object inside
the array of mapModel is considered to be a linked list inside a network. And for node list array an object is
considered a node in a list. Here are the list details -

0. **mapModel** - Array of objects and each objects represents a Linked List inside a Network.
1. **list_Id** - The ID of a list.
2. **node_List** - Array of objects and each object represents a node just list.
3. **node_Id** - The ID of a node.
4. **node_Type** - Object containing two keys
    1. **type** - Type of the node - either it will be `'local'` or `'foreign'`.
    2. **reference** - It is the reference ID of a foreign node from different linked list if the `type: 'foreign'`.
       For `type: 'local'` set to null.
5. **node_Data** - This is where you pass your callback function for execution in the list. All data should be an arrow
   function.

## Conditions of Network Generation

### 1. If the head node is not a Foreign Node.

Then the head node will consider an entry node that will be access as an input, and the list will be considered
independent list. And if it is a foreign node then it will not be accessed directly, and the list will be considered a
dependent list.

### 2. The list types.

The list cannot have multiple types, it can only be either singly or doubly list types.

### 3. The List and Node ID.

The List and Node IDs are set to `null` by default, the format of assigning an ID is -

        list_Id = XXX;

it will have three digits and should starts with 001.

        node_Id = XXXXXX;

it will have six digits. The first three digit represents list_Id and second three digits represents actually node ID,
for example let's assume, inside the list one we have three nodes and in list two we have two nodes now the IDs will be
like this-

        list_Id = 001;// list one
            node_Id = 001001;// node one for list one
            node_Id = 001002;// node two for list one
            node_Id = 001003;// node three for list one
        list_Id = 002;// list two
            node_Id = 002001;// node one for list two
            node_Id = 002002;// node two for list two

_**It is highly recommends to use above ID format!**_

Other method will be to use network ID generator if the linked list is too big you can use it before building Network.
To do that you can call a function `idGen();`. This function takes two arguments, the first arguments is array of
objects called `mapQuantity` as shown below -

    const mapQuantity = [{numberOfNode: 20},{numberOfNode: 15},{numberOfNode: 16},];

The mapQuantity is an array of objects, each object represents a List in a network and inside that list the key
numberOfNode represents number of nodes presents in a list. The Second arguments is called `idType`

    const idType = 'type of the ID';

The type of IDs is as follows - `small` or `large`. All the IDs will be numeric only.

_**Note:**_ the `large` is for a very large Network where it can reach up to 999999 linked list and nodes inside each
linked list will be 999999, So the total number nodes in this type network will be 999,998,000,001. And
the `small` can be use for networks where linked list is 999 and node inside each list is 999, So the total
number nodes in this type network will be 998,001.

Now let's assume we want to generate IDs of two lists with three and two nodes inside respectively, then the code will
be -

    const mapQuantity = [{numberOfNode: 3},{numberOfNode: 2},];
    const idType = 'small';
    idGen(mapQuantity, idType);

This will generate table of IDs in the terminal. From where you can put those generated IDs in Map Model.

    For List --> 001
    ┌──────────┬──────────┐
    │ (index)  │  Values  │
    ├──────────┼──────────┤
    │  listId  │  '001'   │
    │ node_Id0 │ '001001' │
    │ node_Id1 │ '001002' │
    │ node_Id2 │ '001003' │
    └──────────┴──────────┘
    For List --> 002
    ┌──────────┬──────────┐
    │ (index)  │  Values  │
    ├──────────┼──────────┤
    │  listId  │  '002'   │
    │ node_Id0 │ '002001' │
    │ node_Id1 │ '002002' │
    └──────────┴──────────┘

Or if you chose `'large'` then -

    For List --> 000001
    ┌──────────┬────────────────┐
    │ (index)  │     Values     │
    ├──────────┼────────────────┤
    │  listId  │    '000001'    │
    │ node_Id0 │ '000001000001' │
    │ node_Id1 │ '000001000002' │
    │ node_Id2 │ '000001000003' │
    └──────────┴────────────────┘
    For List --> 000002
    ┌──────────┬────────────────┐
    │ (index)  │     Values     │
    ├──────────┼────────────────┤
    │  listId  │    '000002'    │
    │ node_Id0 │ '000002000001' │
    │ node_Id1 │ '000002000002' │
    └──────────┴────────────────┘

### 4. Number of linked list.

The number of linked list in a network will be determined by the length of Map Model or Network Map which will be -

      const numberOfLinkedList = mapModel.length; // because it is array

### 5. Number of Node in a linked list.

The number of nodes must be greater than one. It means a linked list should have at least two nodes one head node and
other will be an output node.

### 6. Foreign Node.

Every list must contain at least one foreign node. Other it will not be able to access the other linked list, and it
will be treated as an individual independent linked list inside network model that will not have any impact on the
network.