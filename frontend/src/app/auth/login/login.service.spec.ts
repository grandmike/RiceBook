// import { TestBed } from '@angular/core/testing';
// import { LoginService } from './login.service';
// import { HttpClientModule } from '@angular/common/http';
//
// describe('LoginService', () => {
//     beforeEach(() => TestBed.configureTestingModule({
//         imports: [HttpClientModule]
//     }));
//
//     it('should log in a previously registered user (not new users)', () => {
//         const service: LoginService = TestBed.get(LoginService);
//         service.doLogin("qs8", "1234").then((data: any) => {
//             expect(data).toBe(true);
//             console.log("test1");
//         }).catch((error)=>{console.log("error->"+error)});;
//     });
//
//     it('should not login an invalid user', () => {
//         const service: LoginService = TestBed.get(LoginService);
//         service.doLogin("qs8", "12345").then((data: any) => {
//             expect(data).toBe(false);
//         }).catch((error)=>{console.log("error->"+error)});;
//     });
//
//     it('should update success message (for displaying login success message to user)', () => {
//         const service: LoginService = TestBed.get(LoginService);
//         service.doLogin("qs8", "1234").then((data: any) => {
//             expect(data).toBe(true);
//             expect(service.ShowSuccessMessage()).toBe("User login successful");
//         }).catch((error)=>{console.log("error->"+error)});;
//     });
//
//     it('should update error message (for displaying login error mesage to user)', () => {
//         const service: LoginService = TestBed.get(LoginService);
//         service.doLogin("qs8", "12345").then((data: any) => {
//             expect(data).toBe(false);
//             expect(service.showErrorMessage()).toBe("Invalid username or wrong password!");
//         }).catch((error)=>{console.log("error->"+error)});;
//     });
//
//
//
// });
