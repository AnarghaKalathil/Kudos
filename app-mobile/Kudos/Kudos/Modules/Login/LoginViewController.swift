//
//  LoginViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 17/07/25.
//

import UIKit


class LoginViewController: UIViewController {

    @IBOutlet weak var txtUsername: UITextField!
    @IBOutlet weak var txtPassword: UITextField!
    @IBOutlet weak var btnSignIn: UIButton!
    @IBOutlet weak var signInView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
    }
    
    func setupView() {
        self.btnSignIn.layer.cornerRadius = 4
        
        self.signInView.layer.cornerRadius = 4
        AppAccess.shared.loadUserData()
        if AppAccess.shared.isLoggedIn ?? false {
            let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
                .instantiateViewController(withIdentifier: NibName.tabbarController.rawValue) as? TabbarController
            self.navigationController?.pushViewController(vc!, animated: true)
        }
    }
    
    @IBAction func onTapSignIn(_ sender: UIButton) {
        let loginRequest = LoginModels.LoginRequest(email: txtUsername.text, password: txtPassword.text)
        Loader.shared.show(on: self.view)
        performLoginApi(loginModel: loginRequest) { success, response in
            if success, let user = response?.data {
                print("Login successful for user: \(user.username)")
                // Save token, navigate, etc.
                AppAccess.shared.saveUserData(user)
                Loader.shared.hide()
                let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
                    .instantiateViewController(withIdentifier: NibName.tabbarController.rawValue) as? TabbarController
                self.navigationController?.pushViewController(vc!, animated: true)
            } else {
                print("Login failed.")
            }
        }

        
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
