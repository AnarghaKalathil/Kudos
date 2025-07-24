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
    @IBOutlet weak var lblIcon: UILabel!
    @IBOutlet weak var imgBg: UIImageView!
    var reqData: RequestModels.ReqModel?
    var reqDataApi: HomeModels.RecognitionItem?
    var isClosed = false
    var didDismissView:(() -> Void)?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        if let data = reqDataApi {
            self.lblName.text = "Requested for: \(data.receiver ?? "")"
            self.lblDept.text = self.formatDateOnly(from: data.created_at ?? "")
            self.lblCategory.text = "Category: \(data.category ?? "")"
            self.txtViewComments.text = data.message
            self.lblTags.text = "Skill: \(data.skills[0])"
            self.lblIcon.text = getInitials(from: data.receiver ?? "")
            self.lblIcon.layer.cornerRadius = self.lblIcon.frame.height/2
            self.lblIcon.clipsToBounds = true
            self.imgBg.layer.cornerRadius = self.imgBg.frame.height/2
            self.imgBg.clipsToBounds = true

            if isClosed {
                self.btnAccept.isHidden = true
                self.btnReject.isHidden = true
            }
            self.btnAccept.layer.cornerRadius = 4
            self.btnReject.layer.cornerRadius = 4
            let fixedWidth = txtViewComments.frame.size.width
            let newSize = txtViewComments.sizeThatFits(CGSize(width: fixedWidth, height: .greatestFiniteMagnitude))
            txtViewCommentsHeightConstraint.constant = newSize.height
            view.layoutIfNeeded()

        }
    }
    func formatDateOnly(from isoString: String) -> String {
        let inputFormatter = ISO8601DateFormatter()
        inputFormatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]

        if let date = inputFormatter.date(from: isoString) {
            let outputFormatter = DateFormatter()
            outputFormatter.dateFormat = "dd MMM yyyy" // Customize this format as needed
            outputFormatter.locale = Locale.current
            return outputFormatter.string(from: date)
        } else {
            return "Invalid Date"
        }
    }
    func getInitials(from name: String) -> String {
        let components = name
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .components(separatedBy: .whitespaces)
            .filter { !$0.isEmpty }

        guard let first = components.first else { return "" }

        if components.count > 1, let last = components.last {
            return "\(first.first!)\(last.first!)".uppercased()
        } else {
            return "\(first.first!)".uppercased()
        }
    }


    func statusChange(id: Int,status: String) {
        Loader.shared.show(on: self.view)
        let request = RequestModels.RecognitionStatusReq(id: id, status: status)
        performStatusApi(reqModel: request) { success, response in
            if success {
                let alert = UIAlertController(title: "Kudos", message: response?.message, preferredStyle: .alert)
                let okAction = UIAlertAction(title: "OK", style: .default) { _ in
                    alert.dismiss(animated: true)
                    self.didDismissView?()
                    self.dismiss(animated: true)
                    Loader.shared.hide()
                }
                alert.addAction(okAction)
                self.present(alert, animated: true, completion: nil)
            } else {
                self.didDismissView?()
                self.dismiss(animated: true)
                Loader.shared.hide()
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
    @IBAction func onTapReject(_ sender: UIButton) {
        self.statusChange(id: self.reqDataApi?.id ?? 0, status: "REJECTED")
    }
    
    @IBAction func onTapAccept(_ sender: UIButton) {
        self.statusChange(id: self.reqDataApi?.id ?? 0, status: "ACCEPTED")
    }
}
