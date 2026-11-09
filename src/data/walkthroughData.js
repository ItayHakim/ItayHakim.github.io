const walkthroughSteps = [
    {
        "title": "Start with a fresh account.",
        "description": "Generate a unique email, complete registration, then verify the home page URL, account email, and authentication cookie.",
        "assertion": "CHECK → URL · account email · auth cookie",
        "icon": "<circle id=\"flow-register-head\" class=\"flow-icon-part\" cx=\"12\" cy=\"8\" r=\"3\"/><path id=\"flow-register-body\" class=\"flow-icon-part\" d=\"M5 21v-3a7 7 0 0 1 14 0v3\"/>"
    },
    {
        "title": "Follow the product’s rules.",
        "description": "Select a random featured product. Fill gift card details or computer options where required, then check the cart quantity and success notification.",
        "assertion": "CHECK → required options · quantity · notification",
        "icon": "<path id=\"flow-select-product\" class=\"flow-icon-part\" d=\"m4 7 8-4 8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4m-8 4v10M8 5l8 4\"/>"
    },
    {
        "title": "Verify what reaches the cart.",
        "description": "Open the shopping cart and compare the product name, quantity, and configured details against the choices made earlier in the test.",
        "assertion": "CHECK → product name · quantity · configuration",
        "icon": "<path id=\"flow-verify-cart\" class=\"flow-icon-part\" d=\"M2 3h3l2 12h12l3-9H6m3 15h.01M18 21h.01M10 10l2 2 4-4\"/><circle id=\"flow-verify-wheel-left\" class=\"flow-icon-part\" cx=\"9\" cy=\"20\" r=\"1\"/><circle id=\"flow-verify-wheel-right\" class=\"flow-icon-part\" cx=\"18\" cy=\"20\" r=\"1\"/>"
    }
];

const projectWalkthroughs = {
    "demo-web-shop": walkthroughSteps,
    "restful-booker": [
        {
            title: "Create a booking. Check what is saved.",
            description: "Generate unique booking details, create a booking, then retrieve it by ID and compare every field with the submitted data.",
            assertion: "CHECK → status 200 · booking ID · saved details",
            icon: '<rect id="booker-flow-create-calendar" class="flow-icon-part" x="3" y="5" width="18" height="16" rx="2"/><path id="booker-flow-create-details" class="flow-icon-part" d="M16 3v4M8 3v4M3 11h18m-13 5 3 3 5-5"/>'
        },
        {
            title: "Verify changes beyond the response.",
            description: "Authenticate, send a full or partial update, then fetch the booking again to verify the saved changes and preserved fields.",
            assertion: "CHECK → authentication · changed fields · saved state",
            icon: '<path id="booker-flow-update-edit" class="flow-icon-part" d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14l-1 7 6-2"/>'
        },
        {
            title: "Confirm deletion and protect access.",
            description: "Delete a booking with a valid token and confirm retrieval returns 404. Separate tests check that missing or invalid tokens leave the booking unchanged.",
            assertion: "CHECK → delete status 201 · retrieval 404 · rejected access",
            icon: '<path id="booker-flow-delete-shield" class="flow-icon-part" d="M12 3 3 7v5c0 5 9 10 9 10s9-5 9-10V7l-9-4Zm-5 9 3 3 7-7"/>'
        }
    ]
};
