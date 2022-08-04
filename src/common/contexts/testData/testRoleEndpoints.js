export default [
    {
        "id": "6b1b7d6a-c325-4908-912c-f485078a53fc",
        "name": "Admin",
        "description": "Has access to all admin endpoints except app settings",
        "createdAt": "2021-11-20T15:29:09.833Z",
        "updatedAt": "2021-11-20T15:29:09.833Z",
        "endpoints": [
            {
                "id": "db422ca5-b0a0-43b1-9381-417be994f08e",
                "endpoint": "/api/v1/endpoints/new",
                "name": "",
                "type": "server",
                "category": "route",
                "subcategory": "POST",
                "description": "create a single endpoint",
                "createdAt": "2021-11-08T06:19:31.163Z",
                "updatedAt": "2021-11-08T08:11:11.815Z",
                "RoleEndpoint": {
                    "id": "d3d4ef5b-dba7-4124-8380-9823008e805a",
                    "createdAt": "2021-11-28T18:34:08.097Z",
                    "updatedAt": "2021-11-28T18:34:08.097Z",
                    "endpointId": "db422ca5-b0a0-43b1-9381-417be994f08e",
                    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc"
                }
            },
            {
                "id": "e1dd4461-3cb6-4a8c-8b18-2b4aa99e4d5b",
                "endpoint": "/api/v1/endpoints/:id",
                "name": "",
                "type": "server",
                "category": "route",
                "subcategory": "PUT",
                "description": "update a single endpoint",
                "createdAt": "2021-11-08T08:12:28.774Z",
                "updatedAt": "2021-11-08T08:12:28.774Z",
                "RoleEndpoint": {
                    "id": "39bc65ac-316d-4296-8af3-d3a65cd61f98",
                    "createdAt": "2021-11-28T18:34:08.097Z",
                    "updatedAt": "2021-11-28T18:34:08.097Z",
                    "endpointId": "e1dd4461-3cb6-4a8c-8b18-2b4aa99e4d5b",
                    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc"
                }
            },
            {
                "id": "e4401d03-bc3f-4ee2-b344-073b638e0b9c",
                "endpoint": "/api/v1/endpoints/:id",
                "name": "",
                "type": "server",
                "category": "route",
                "subcategory": "GET",
                "description": "get a single endpoint",
                "createdAt": "2021-11-08T08:13:13.994Z",
                "updatedAt": "2021-11-08T08:13:13.994Z",
                "RoleEndpoint": {
                    "id": "d2df9e64-1cc3-45aa-b21f-00327f615ce8",
                    "createdAt": "2021-11-28T18:34:08.097Z",
                    "updatedAt": "2021-11-28T18:34:08.097Z",
                    "endpointId": "e4401d03-bc3f-4ee2-b344-073b638e0b9c",
                    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc"
                }
            },
            {
                "id": "c6ff0af1-851c-480c-ba97-69fef72316d2",
                "endpoint": "/api/v1/endpoints/:id",
                "name": "",
                "type": "server",
                "category": "route",
                "subcategory": "DELETE",
                "description": "delete a single endpoint",
                "createdAt": "2021-11-08T08:11:58.199Z",
                "updatedAt": "2021-11-08T08:14:26.998Z",
                "RoleEndpoint": {
                    "id": "47f1a896-8151-4edc-8482-dc2ad8b9b3d4",
                    "createdAt": "2021-11-28T18:34:08.097Z",
                    "updatedAt": "2021-11-28T18:34:08.097Z",
                    "endpointId": "c6ff0af1-851c-480c-ba97-69fef72316d2",
                    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc"
                }
            },
            {
                "id": "1fc0327c-37a3-45e1-90a4-a9fd1893c6e8",
                "endpoint": "/api/v1/accounts/new",
                "name": "",
                "type": "server",
                "category": "route",
                "subcategory": "POST",
                "description": "create single account",
                "createdAt": "2021-11-08T13:17:53.715Z",
                "updatedAt": "2021-11-08T13:17:53.715Z",
                "RoleEndpoint": {
                    "id": "2c460738-1756-410c-8c5c-bbaef185247e",
                    "createdAt": "2021-11-28T18:34:08.097Z",
                    "updatedAt": "2021-11-28T18:34:08.097Z",
                    "endpointId": "1fc0327c-37a3-45e1-90a4-a9fd1893c6e8",
                    "roleId": "6b1b7d6a-c325-4908-912c-f485078a53fc"
                }
            }
        ]
    },
        {
        "id": "4a21f627-9455-4920-ac8f-550d91b752bc",
        "name": "Normal user",
        "description": "Has access to some major endpoints",
        "createdAt": "2021-11-20T15:30:48.794Z",
        "updatedAt": "2021-11-20T15:30:48.794Z",
        "endpoints": []
    },
    {
        "id": "e79c8692-4cc2-4971-a52c-832e87b46e8f",
        "name": "Super admin",
        "description": "Has access to all endpoints",
        "createdAt": "2021-11-20T15:27:31.513Z",
        "updatedAt": "2021-11-20T15:27:31.513Z",
        "endpoints": []
    },
    {
        "id": "9fcaacd3-978f-45c4-b51c-da684601024c",
        "name": "Client",
        "description": "Has access to only minor endpoints",
        "createdAt": "2021-11-20T15:31:31.480Z",
        "updatedAt": "2021-11-20T15:31:31.480Z",
        "endpoints": []
    }
]