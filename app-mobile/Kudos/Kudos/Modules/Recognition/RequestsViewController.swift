//
//  RequestsViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit


class RequestsViewController: UIViewController {
    
    @IBOutlet weak var navBar: UIView!
    
    @IBOutlet weak var requestCollectionView: UICollectionView!
    @IBOutlet weak var tabView: UIView!
    @IBOutlet weak var btnNewReq: UIButton!
    @IBOutlet weak var btnClosedReq: UIButton!
    
    var requsetArrApi = [HomeModels.RecognitionItem]()
    //Static Data
    let requestArr: [RequestModels.ReqModel] = [
        RequestModels.ReqModel(fromName: "Alice Johnson", forName: "Bob Anderson", category: "Leadership", dept: "Engineering", commects: "Great guidance on the new project launch!", tag: "Team Leadership", date: "2025-07-01", status: "Approved"),
        RequestModels.ReqModel(fromName: "Charlie Martin", forName: "Diana Patel", category: "Problem Solving", dept: "Quality Assurance", commects: "Quickly resolved a critical bug before release.", tag: "Debugging", date: "2025-07-02", status: "Pending"),
        RequestModels.ReqModel(fromName: "Evan Thomas", forName: "Fiona Lewis", category: "Mentoring & Support", dept: "Human Resources", commects: "Helped me understand the new onboarding process.", tag: "Mentorship", date: "2025-07-03", status: "Approved"),
        RequestModels.ReqModel(fromName: "George Kim", forName: "Hannah Singh", category: "Integrity & Trust", dept: "Legal & Compliance", commects: "Handled a tough compliance case with transparency.", tag: "Compliance", date: "2025-07-04", status: "Rejected"),
        RequestModels.ReqModel(fromName: "Ian Parker", forName: "Judy Ramirez", category: "Continuous Learning & Growth", dept: "Learning & Development", commects: "Led an insightful workshop on AI tools.", tag: "Learning", date: "2025-07-05", status: "Approved"),
        RequestModels.ReqModel(fromName: "Bob Anderson", forName: "Alice Johnson", category: "Creativity & Innovation", dept: "Product Design", commects: "Came up with a brilliant new feature idea.", tag: "Innovation", date: "2025-07-06", status: "Pending"),
        RequestModels.ReqModel(fromName: "Diana Patel", forName: "Charlie Martin", category: "Customer Centricity", dept: "Customer Success", commects: "Went the extra mile for an unhappy customer.", tag: "Customer First", date: "2025-07-07", status: "Approved"),
        RequestModels.ReqModel(fromName: "Fiona Lewis", forName: "Evan Thomas", category: "Collaboration & Teamwork", dept: "DevOps", commects: "Great coordination during the deployment.", tag: "Teamwork", date: "2025-07-08", status: "Approved"),
        RequestModels.ReqModel(fromName: "Hannah Singh", forName: "George Kim", category: "Accountability & Ownership", dept: "Backend Team", commects: "Took full ownership of the incident response.", tag: "Ownership", date: "2025-07-09", status: "Rejected"),
        RequestModels.ReqModel(fromName: "Judy Ramirez", forName: "Ian Parker", category: "Going the Extra Mile", dept: "IT Support", commects: "Stayed late to ensure everyone’s system was restored.", tag: "Support", date: "2025-07-10", status: "Approved")
    ]
    
    var newRequests = [RequestModels.ReqModel]()
    var closedRequests = [RequestModels.ReqModel]()
    var newRequestsApi = [HomeModels.RecognitionItem]()
    var closedRequestsApi = [HomeModels.RecognitionItem]()
    var btnTag = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    func setupView() {
        //Nav bar
        self.navBar.applyShadow()
        
        self.tabView.applyShadow()
        
        self.btnNewReq.backgroundColor = UIColor(hex: "#6554EF", alpha: 0.68)
        //Collectionview
        self.newRequestsApi = self.requsetArrApi.filter { $0.status?.lowercased() == "pending" }
        let nibName = UINib(nibName: CellNibName.requestsCollectionViewCell.rawValue, bundle: nil)
        self.requestCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.requestsCollectionViewCell.rawValue)
        self.requestCollectionView.delegate = self
        self.requestCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        collectionLayout.minimumLineSpacing = 2
        collectionLayout.minimumInteritemSpacing = 2
        self.requestCollectionView.collectionViewLayout = collectionLayout

    }
    func getAllRecData() {
        Loader.shared.show(on: self.view)
        performGetAllRecognitionApi { success, response in
            if success {
                if let recData = response  {
                    self.requsetArrApi = recData.data
                }
                print(response)
                self.setupView()
                Loader.shared.hide()
            } else {
                print("Recognitions failed.")
                Loader.shared.hide()
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
    @IBAction func onTapBack(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
    
    @IBAction func onTapTab(_ sender: UIButton) {
        self.btnTag = sender.tag
       // self.newRequests = self.requestArr.filter { $0.status?.lowercased() == "pending" }
        self.newRequestsApi = self.requsetArrApi.filter { $0.status?.lowercased() == "pending" }
//        self.closedRequests = self.requestArr.filter {
//            let status = $0.status?.lowercased()
//            return status == "approved" || status == "rejected"
//        }
        self.closedRequestsApi = self.requsetArrApi.filter {
            let status = $0.status?.lowercased()
            return status == "accepted" || status == "rejected"
        }

        self.requestCollectionView.reloadData()
        if btnTag == 0 {
            self.btnNewReq.backgroundColor = UIColor(hex: "#6554EF", alpha: 0.68)
            self.btnClosedReq.backgroundColor = UIColor.white
        } else {
            self.btnClosedReq.backgroundColor = UIColor(hex: "#6554EF", alpha: 0.68)
            self.btnNewReq.backgroundColor = UIColor.white
        }
    }
}

extension RequestsViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return btnTag == 0 ? self.newRequestsApi.count  : self.closedRequestsApi.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.requestsCollectionViewCell.rawValue, for: indexPath) as! RequestsCollectionViewCell
        cell.reqDataApi = btnTag == 0 ? self.newRequestsApi[indexPath.item]  : self.closedRequestsApi[indexPath.item]
        cell.setupView()
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.requestDetailViewController.rawValue) as? RequestDetailViewController
        vc?.reqDataApi = btnTag == 0 ? self.newRequestsApi[indexPath.item]  : self.closedRequestsApi[indexPath.item]
        vc?.isClosed = btnTag == 0 ? false : true
        vc?.didDismissView = { [weak self] () in
            self?.getAllRecData()
        }
        self.navigationController?.present(vc!, animated: true)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width - 5, height: 115)
    }
    
    
}
