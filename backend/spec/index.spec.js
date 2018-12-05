const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate Authorization', () => {

    it('login', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req).then(r => r.json())
            .then(r=> {
                expect(r.id).toBe('qs8');
                expect(r.result).toBe("success");
                done();
            });
    });

    /**
     * register a new user, id should be unique
     */
    it('register', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const newuser = {
            id:'qs10', //id is unique
            username:'gm3',
            password:'1234',
            email:'sun@gmail.com',
            zipcode:'12123',
            phone:'123-123-1234',
            birth:'2018-11-01'
        }
        const req = {
            method:'POST',
            body: JSON.stringify(newuser),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/register'), req).then(r => r.json())
            .then(r=> {
                console.log(r);
                // expect(r.id).toBe('qs10');
                // expect(r.result).toBe("success");
                done();
            });
    });


    it('logout', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');
                // console.log(r.headers);
                // console.log(ck);

                req = {
                    method:'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck
                    }
                };

                fetch(url('/headlines/netid?id=qs8&id=qs9'), req).then(r => r.json())
                    .then(r=> {
                        console.log(r);
                        //expect(r.id).toBe('qs8');
                        //expect(r.result).toBe("success");
                        done();
                    });
            });


    });

    it('get headlines', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');

                fetch(url('/headlines/netid?id=qs8'), {
                    method:'GET',
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck
                    }
                }).then(r => r.json())
                    .then(r=> {
                        console.log(r);
                        expect(r.result).toBe('success');
                        expect(r.headlines.length).toBe(1);
                        for (let i = 0; i < r.headlines.length; i++) {
                            expect(r.headlines[i].headline).toBe('I\'m new here');
                        }
                        done();
                    });
            });


    });

    it('update headlines', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');

                fetch(url('/headline'), {
                    method:'PUT',
                    body:JSON.stringify({id:'qs8', status:'I\'m new here'}),
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck,
                    }
                }).then(r => r.json())
                    .then(r=> {
                        console.log('res ');
                        console.log(r);
                        expect(r.result).toBe('success');
                        expect(r.status).toBe('I\'m new here');
                        done();
                    });
            });

    });


    it('get articles with netid', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');

                fetch(url('/articles/netid?id=qs8'), {
                    method:'GET',
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck,
                    }
                }).then(r => r.json())
                    .then(r=> {
                        console.log(r);
                        expect(r.result).toBe('success');
                        expect(r.articles.length).toBe(5);
                        done();
                    });
            });

    });


    it('get article', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');

                fetch(url('/articles'), {
                    method:'GET',
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck,
                    }
                }).then(r => r.json())
                    .then(r=> {
                        expect(r.result).toBe('success');
                        expect(r.articles.length).toBe(12);
                        done();
                    });
            });

    });

    it('post a article', (done)=> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let req = {
            method:'POST',
            body: JSON.stringify({id:'qs8', password:'1234'}),
            credentials: 'include',
            headers: myHeaders
        };
        fetch(url('/login'), req)
            .then(r=> {
                const ck = r.headers.get('set-cookie');

                const newarticle = {
                    id: 'qs8',
                    articleid: "useless",
                    author: 'gm1',
                    title: 'new article',
                    time: new Date().toLocaleString(),
                    img: 'assets/4.png',
                    article: 'for back end test',
                    comments: []
                };

                fetch(url('/article'), {
                    method:'POST',
                    body:JSON.stringify({id:'qs8', article:newarticle}),
                    headers: {
                        "Content-Type":'application/json',
                        Cookie:ck,
                    }
                }).then(r => r.json())
                    .then(r=> {
                        console.log(r);
                        expect(r.result).toBe('success');
                        expect(r.article.id).toBe('qs8');
                        expect(r.article.article).toBe('for back end test');
                        done();
                    });
            });
     });
});