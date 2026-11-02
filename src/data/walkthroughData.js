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
