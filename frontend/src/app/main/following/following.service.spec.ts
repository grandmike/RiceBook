// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import {FollowingService} from './following.service';
//
// describe('FollowingService', () => {
//     beforeEach(() => TestBed.configureTestingModule({
//         imports: [HttpClientModule]
//     }));
//
//     it('should add articles when adding a follower', () => {
//         const service: FollowingService = TestBed.get(FollowingService);
//         const curFollowing = [{"id": "qs8", "username": "gm1", "status": "I'm great", "img": "assets/1.png"}];
//         const curFollowingId = ["qs8"];
//         const curId = "qs9";
//         service.doAdd("gm3", "gm2", curFollowing, curFollowingId, curId).then((posts) => {
//             console.log("Add new");
//             expect(posts.length).toEqual(8);
//         }).catch((error)=>{console.log("error->"+error)});
//     });
//
//     it('should remove articles when removing a follower', () => {
//         const service: FollowingService = TestBed.get(FollowingService);
//         const curFollowing = [{"id": 'qs8', "username": "gm1", "status": "I'm great", "img": "assets/1.png"}];
//         const curFollowingId = ['qs8'];
//         const curId = "qs9";
//         const p = {"id":"qs8", "username":"gm1"};
//         service.doUnfollow(p, curId, curFollowing, curFollowingId).then((posts) => {
//             expect(posts.length).toEqual(3);
//         }).catch((error)=>{console.log("error->"+error)});
//     });
//
//
//
//
//
// });
