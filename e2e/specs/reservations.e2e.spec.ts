describe('Reservations',()=>{
    beforeAll(async () => {
        const user = {
        email: 'sleeprnestapp@gmail.com',
        password: 'StrogPassword123!@',
        };
        await fetch('http://auth:3001/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        });
    })
    
})