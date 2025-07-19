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
        self.btnSignIn.layer.borderWidth = 1
        self.btnSignIn.layer.borderColor = UIColor.tintColor.cgColor
        
        self.signInView.layer.cornerRadius = 4
        self.signInView.layer.borderWidth = 1
        self.signInView.layer.borderColor = UIColor.black.cgColor
    }
    
    @IBAction func onTapSignIn(_ sender: UIButton) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.tabbarController.rawValue) as? TabbarController
        self.navigationController?.pushViewController(vc!, animated: true)
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
