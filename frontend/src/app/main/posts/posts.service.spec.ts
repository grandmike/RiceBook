// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import {PostsService} from './posts.services';
//
// describe('PostsService', () => {
//     beforeEach(() => TestBed.configureTestingModule({
//         imports: [HttpClientModule]
//     }));
//
//     it('should fetch articles for current logged in user', () => {
//         const service: PostsService = TestBed.get(PostsService);
//         const posts = [
//             {"id": "qs8", "author": "gm1", "title": "eiusmod tempor incididunt ut labore et", "time": "10/17/2018, 8:46:26 PM",
//                 "img": "https://oir.rice.edu/sites/g/files/bxs1496/f/styles/image_16_9__1920x1080_/public/heroslides/lovett-backdrop-crop.jpg?itok=bXLrGPQf",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs9", "author": "gm2", "title": "eiusmod tempor incididunt ut labore et", "time": "10/16/2018, 8:46:26 PM",
//                 "img": "http://7.pic.paopaoche.net/thumb/up/2018-5/15276420466849089_600_0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs10", "author": "gm3", "title": "eiusmod tempor incididunt ut labore et", "time": "10/15/2018, 8:46:26 PM",
//                 "img": "http://img3.imgtn.bdimg.com/it/u=1748163033,308593818&fm=26&gp=0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//         ];
//         localStorage.setItem('curPosts', JSON.stringify(posts));
//
//         const loadposts = service.getCurPosts();
//         expect(posts.length).toEqual(loadposts.length);
//         for (let i = 0; i < posts.length; i++) {
//             expect(posts[i].id).toEqual(loadposts[i].id);
//             expect(posts[i].author).toEqual(loadposts[i].author);
//             expect(posts[i].article).toEqual(loadposts[i].article);
//             expect(posts[i].time).toEqual(loadposts[i].time);
//         }
//         console.log(posts.length);
//
//     });
//
//     it('should update the search keyword', () => {
//         const service: PostsService = TestBed.get(PostsService);
//         const _posts = [
//             {"id": "qs8", "author": "gm1", "title": "eiusmod tempor incididunt ut labore et", "time": "10/17/2018, 8:46:26 PM",
//                 "img": "https://oir.rice.edu/sites/g/files/bxs1496/f/styles/image_16_9__1920x1080_/public/heroslides/lovett-backdrop-crop.jpg?itok=bXLrGPQf",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs9", "author": "gm2", "title": "eiusmod tempor incididunt ut labore et", "time": "10/16/2018, 8:46:26 PM",
//                 "img": "http://7.pic.paopaoche.net/thumb/up/2018-5/15276420466849089_600_0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs10", "author": "gm3", "title": "eiusmod tempor incididunt ut labore et", "time": "10/15/2018, 8:46:26 PM",
//                 "img": "http://img3.imgtn.bdimg.com/it/u=1748163033,308593818&fm=26&gp=0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//         ];
//         localStorage.setItem('curPosts', JSON.stringify(_posts));
//         let loadposts = service.getCurPosts();
//         let posts = service.doSearch("gm1", loadposts);
//         for (let i = 0; i < posts.length; i++) {
//             expect(posts[i].id).toEqual("qs8");
//             expect(posts[i].author).toEqual("gm1");
//         }
//         console.log(posts.length);
//
//     });
//     it('should filter displayed articles by the search keyword', () => {
//         const service: PostsService = TestBed.get(PostsService);
//         const __posts = [
//             {"id": "qs8", "author": "gm1", "title": "eiusmod tempor incididunt ut labore et", "time": "10/17/2018, 8:46:26 PM",
//                 "img": "https://oir.rice.edu/sites/g/files/bxs1496/f/styles/image_16_9__1920x1080_/public/heroslides/lovett-backdrop-crop.jpg?itok=bXLrGPQf",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs9", "author": "gm2", "title": "eiusmod tempor incididunt ut labore et", "time": "10/16/2018, 8:46:26 PM",
//                 "img": "http://7.pic.paopaoche.net/thumb/up/2018-5/15276420466849089_600_0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//             {"id": "qs10", "author": "gm3", "title": "eiusmod tempor incididunt ut labore et", "time": "10/15/2018, 8:46:26 PM",
//                 "img": "http://img3.imgtn.bdimg.com/it/u=1748163033,308593818&fm=26&gp=0.jpg",
//                 "article": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
//                 "comments":[
//                     {"username":"gm1", "comment":"I like it"},
//                     {"username":"gm2", "comment":"Nice one"}
//                 ]},
//         ];
//         localStorage.setItem('curPosts', JSON.stringify(__posts));
//         let loadposts = service.getCurPosts();
//         let posts1 = service.doSearch("gm1", loadposts);
//         for (let i = 0; i < posts1.length; i++) {
//             expect(posts1[i].id).toEqual("qs8");
//             expect(posts1[i].author).toEqual("gm1");
//         }
//         console.log(posts1.length);
//         let posts2 = service.doSearch("gm2", loadposts);
//         for (let i = 0; i < posts2.length; i++) {
//             expect(posts2[i].id).toEqual("qs9");
//             expect(posts2[i].author).toEqual("gm2");
//         }
//
//     });
//
//
//
//
// });
