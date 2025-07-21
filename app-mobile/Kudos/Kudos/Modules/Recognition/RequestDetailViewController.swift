//
//  RequestDetailViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class RequestDetailViewController: UIViewController {
    @IBOutlet weak var requestView: UIView!
    
    @IBOutlet weak var btnReject: UIButton!
    @IBOutlet weak var btnAccept: UIButton!
    @IBOutlet weak var txtViewCommentsHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblDept: UILabel!
    @IBOutlet weak var lblCategory: UILabel!
    @IBOutlet weak var txtViewComments: UITextView!
    @IBOutlet weak var lblTags: UILabel!
    var reqData: RequestModels.ReqModel?
    var isClosed = false
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        if let data = reqData {
            self.lblName.text = "Requested for: \(data.forName ?? "")"
            self.lblDept.text = "Department: \(data.dept ?? "")"
            self.lblCategory.text = "Category: \(data.category ?? "")"
            self.txtViewComments.text = data.commects
            self.lblTags.text = "Tag: \(data.tag ?? "")"
            
            if isClosed {
                self.btnAccept.isHidden = true
                self.btnReject.isHidden = true
            }
            
            let fixedWidth = txtViewComments.frame.size.width
            let newSize = txtViewComments.sizeThatFits(CGSize(width: fixedWidth, height: .greatestFiniteMagnitude))
            txtViewCommentsHeightConstraint.constant = newSize.height
            view.layoutIfNeeded()

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
    @IBAction func onTapReject(_ sender: UIButton) {
        self.dismiss(animated: true)
    }
    
    @IBAction func onTapAccept(_ sender: UIButton) {
        self.dismiss(animated: true)
    }
}
