//
//  HomeViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 17/07/25.
//

import UIKit

class HomeViewController: UIViewController {
    //Nav Bar
    @IBOutlet weak var navBar: UIView!
    @IBOutlet weak var imgLogo: UIImageView!
    
    //Welcome View
    @IBOutlet weak var viewWelcome: UIView!
    @IBOutlet weak var viewWeolcomeHeightConstraint: NSLayoutConstraint!
    @IBOutlet weak var lblWelcome: UILabel!
    @IBOutlet weak var lblCaption: UILabel!
    @IBOutlet weak var lblPemdingReq: UILabel!
    @IBOutlet weak var btnReviewReq: UIButton!
    @IBOutlet weak var btnRecipient: UIButton!
    
    @IBOutlet weak var tabView: UIView!
    @IBOutlet weak var btnGivers: UIButton!
    @IBOutlet weak var leaderboardCollectionView: UICollectionView!
    //Variables
    var tabBtnTag = 0
    
    
    //Static data
    let topRecepientsArr: [HomeModels.UserModel] = [
        HomeModels.UserModel(
            name: "Alice Johnson",
            category: [HomeModels.CategoryModel(name: "Leadership", starCount: 5, recognizedBy: ["Ravi Nair"])],
            starCount: 5,
            dept: "Engineering",
            skillTags: ["Swift", "Git"]
        ),
        HomeModels.UserModel(
            name: "Bob Anderson",
            category: [HomeModels.CategoryModel(name: "Creativity & Innovation", starCount: 4, recognizedBy: ["Megha Shah"])],
            starCount: 4,
            dept: "Design",
            skillTags: ["React", "TypeScript"]
        ),
        HomeModels.UserModel(
            name: "Charlie",
            category: [HomeModels.CategoryModel(name: "Customer Centricity", starCount: 3, recognizedBy: ["Amit Sinha"])],
            starCount: 3,
            dept: "Support",
            skillTags: ["Node.js", "Firebase"]
        ),
        HomeModels.UserModel(
            name: "Diana Patel",
            category: [HomeModels.CategoryModel(name: "Problem Solving", starCount: 4, recognizedBy: ["Neha Rao"])],
            starCount: 4,
            dept: "QA",
            skillTags: ["Python", "CI/CD"]
        ),
        HomeModels.UserModel(
            name: "Evan Thomas",
            category: [HomeModels.CategoryModel(name: "Collaboration & Teamwork", starCount: 5, recognizedBy: ["Alok Verma"])],
            starCount: 5,
            dept: "DevOps",
            skillTags: ["Docker", "Kubernetes"]
        )
    ]

    let topGiversArr: [HomeModels.UserModel] = [
        HomeModels.UserModel(
            name: "Fiona",
            category: [HomeModels.CategoryModel(name: "Mentoring & Support", starCount: 3, recognizedBy: ["Sara Iyer"])],
            starCount: 3,
            dept: "HR",
            skillTags: ["SQL"]
        ),
        HomeModels.UserModel(
            name: "George Bailey",
            category: [HomeModels.CategoryModel(name: "Accountability & Ownership", starCount: 2, recognizedBy: ["Vinay K"])],
            starCount: 2,
            dept: "Backend",
            skillTags: ["AWS"]
        ),
        HomeModels.UserModel(
            name: "Hannah Kumar",
            category: [HomeModels.CategoryModel(name: "Integrity & Trust", starCount: 5, recognizedBy: ["Nitin Kumar"])],
            starCount: 5,
            dept: "Legal",
            skillTags: ["Git"]
        ),
        HomeModels.UserModel(
            name: "Ian Wright",
            category: [HomeModels.CategoryModel(name: "Going the Extra Mile", starCount: 4, recognizedBy: ["Alok Verma"])],
            starCount: 4,
            dept: "IT",
            skillTags: ["CI/CD", "Swift"]
        ),
        HomeModels.UserModel(
            name: "Judy Fernandes",
            category: [HomeModels.CategoryModel(name: "Continuous Learning & Growth", starCount: 4, recognizedBy: ["Neha Rao"])],
            starCount: 4,
            dept: "L&D",
            skillTags: ["Python", "TypeScript"]
        )
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    //Setup view
    func setupView() {
        //Nav Bar
        self.imgLogo.layer.cornerRadius = 4
        self.navBar.applyShadow()
        
        //Welcome View
        self.viewWelcome.layer.cornerRadius = 4
        self.btnReviewReq.layer.cornerRadius = 4
        
        self.tabView.applyShadow()
        
        //Collectionview
        let nibName = UINib(nibName: CellNibName.leaderboardCollectionViewCell.rawValue, bundle: nil)
        self.leaderboardCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.leaderboardCollectionViewCell.rawValue)
        self.leaderboardCollectionView.delegate = self
        self.leaderboardCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        collectionLayout.minimumLineSpacing = 2
        collectionLayout.minimumInteritemSpacing = 2
        self.leaderboardCollectionView.collectionViewLayout = collectionLayout
    }

    //Button Actions
    @IBAction func onTapTabBtn(_ sender: UIButton) {
        self.tabBtnTag = sender.tag
        self.leaderboardCollectionView.reloadData()
        if tabBtnTag == 0 {
            self.btnRecipient.backgroundColor = UIColor(hex: "#DD5426", alpha: 0.68)
            self.btnGivers.backgroundColor = UIColor.white
        } else {
            self.btnGivers.backgroundColor = UIColor(hex: "#DD5426", alpha: 0.68)
            self.btnRecipient.backgroundColor = UIColor.white
        }
    }

    @IBAction func onTapReviewReq(_ sender: UIButton) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.requestsViewController.rawValue) as? RequestsViewController
        self.navigationController?.pushViewController(vc!, animated: true)
    }
    
    @IBAction func onTapProfile(_ sender: UIButton) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.profileViewController.rawValue) as? ProfileViewController
        self.navigationController?.pushViewController(vc!, animated: true)
    }
    
    @IBAction func onTapSearch(_ sender: UIButton) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.peopleViewController.rawValue) as? PeopleViewController
        vc?.isFromRecognition = true
        vc?.isTagSearch = true
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

extension HomeViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return tabBtnTag == 0 ? topRecepientsArr.count : topGiversArr.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.leaderboardCollectionViewCell.rawValue, for: indexPath) as! LeaderboardCollectionViewCell
        if tabBtnTag == 0 {
            cell.setupView(data: topRecepientsArr[indexPath.item])
        } else {
            cell.setupView(data: topGiversArr[indexPath.item])
        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width - 5, height: 90)
    }
    
    
}
