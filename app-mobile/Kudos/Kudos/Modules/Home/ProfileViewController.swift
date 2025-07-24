//
//  ProfileViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit


class ProfileViewController: UIViewController {
    
    @IBOutlet weak var navBar: UIView!
    @IBOutlet weak var profileView: UIView!
    @IBOutlet weak var tagCollectionView: UICollectionView!
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblDept: UILabel!
    @IBOutlet weak var recognitionCollectionView: UICollectionView!
    @IBOutlet weak var bg: UIImageView!
    
    @IBOutlet weak var imgLogout: UIImageView!
    @IBOutlet weak var btnLogout: UIButton!
    var isFromPeople = false
    var selectedUser: HomeModels.UserModel?
    var userCategories = [CategoryModel.UserCategory]()
    var userSkills = [String]()
    //    var userSkills = [SkillModels.SkillData]()
    var selectedUserApi: PeopleModel.Recognitions?
    var userApi: HomeModels.ProfileData?
    //Static Data
    let user = HomeModels.UserModel(
        name: "Akshaya Mathoor",
        category: [
            HomeModels.CategoryModel(name: "Leadership", starCount: 4, recognizedBy: ["Ravi Nair", "Megha Shah"]),
            HomeModels.CategoryModel(name: "Mentoring & Support", starCount: 5, recognizedBy: ["Nitin Kumar", "Sara Iyer"]),
            HomeModels.CategoryModel(name: "Creativity & Innovation", starCount: 4, recognizedBy: ["Alok Verma"]),
            HomeModels.CategoryModel(name: "Collaboration & Teamwork", starCount: 5, recognizedBy: ["Megha Shah", "Anjali Desai"]),
            HomeModels.CategoryModel(name: "Accountability & Ownership", starCount: 4, recognizedBy: ["Ravi Nair"]),
            HomeModels.CategoryModel(name: "Customer Centricity", starCount: 3, recognizedBy: ["Preeti Agarwal"]),
            HomeModels.CategoryModel(name: "Problem Solving", starCount: 5, recognizedBy: ["Karan Joshi", "Neha Rao"]),
            HomeModels.CategoryModel(name: "Going the Extra Mile", starCount: 4, recognizedBy: ["Vinay K", "Alok Verma"]),
            HomeModels.CategoryModel(name: "Integrity & Trust", starCount: 5, recognizedBy: ["Amit Sinha"]),
            HomeModels.CategoryModel(name: "Continuous Learning & Growth", starCount: 5, recognizedBy: ["Neha Rao", "Sara Iyer"])
            
        ],
        starCount: 44, // Total or an average, depending on usage
        dept: "Engineering",
        skillTags: [
            "Swift", "React", "Node.js", "Docker", "Kubernetes", "Git"
        ]
    )
    
    override func viewDidLoad() {
        super.viewDidLoad()
        AppAccess.shared.loadUserData()
        if !self.isFromPeople {
            self.getProfileData()
        } else {
            self.setupView()
            self.btnLogout.isHidden = true
            self.imgLogout.isHidden = true
        }
        // Do any additional setup after loading the view.
    }
    func getProfileData() {
        Loader.shared.show(on: self.view)
        performProfileApi(){ success, response in
            if success {
                self.userApi = response
                print(self.userApi)
                self.setupView()
                Loader.shared.hide()
            } else {
                print("Dashboard failed.")
                Loader.shared.hide()
            }
        }
        
    }
    func setupView() {
        //Nav bar
        self.navBar.applyShadow()
        
        self.profileView.layer.cornerRadius =  4
        self.bg.layer.cornerRadius = 4
        self.bg.clipsToBounds = true
        if isFromPeople {
            // self.lblName.text = self.selectedUser?.name ?? ""
            self.lblName.text = self.selectedUserApi?.name ?? ""
            self.lblDept.text = self.selectedUserApi?.email ?? ""
        } else {
            self.lblName.text = self.userApi?.name ?? ""
            self.lblDept.text = AppAccess.shared.user?.userData.designation ?? ""
        }
        self.userCategories = []
        if isFromPeople {
            if let approved = self.selectedUserApi?.recognitions.approved {
                for rec in approved {
                    if !userCategories.contains(where: {$0.name == rec.category ?? ""}) {
                        let catCount = self.selectedUserApi?.recognitions.approved.filter {$0.category == rec.category ?? ""}
                        self.userCategories.append(CategoryModel.UserCategory(name: rec.category ?? "", count: catCount?.count ?? 0, senders: []))
                    }
                }
            }
        } else {
            if let recArr = self.userApi?.recognitions {
                for rec in recArr {
                    if !userCategories.contains(where: {$0.name == rec.category ?? ""}) {
                        let senders = self.userApi?.recognitions.filter{$0.category == rec.category} ?? []
                        var sendersArr = [String]()
                        var starCount = 0
                        for sender in senders {
                            sendersArr.append(sender.sender ?? "")
                        }
                        if self.userApi?.star_summary[rec.category ?? ""] != nil {
                            starCount = self.userApi?.star_summary[rec.category ?? ""] ?? 0
                        }
                        self.userCategories.append(CategoryModel.UserCategory(name: rec.category ?? "", count: sendersArr.count, senders: sendersArr))
                    }
                }
            }
            self.userSkills = []
            for rec in self.userApi?.recognitions ?? [] {
                for skillSet in rec.skills {
                    if !userSkills.contains(where: { $0 == skillSet }) {
                        self.userSkills.append(skillSet)
                    }
                }
            }
            print(self.userSkills)
        }
        
        //Collectionview
        let nibName = UINib(nibName: CellNibName.tagsCollectionViewCell.rawValue, bundle: nil)
        self.tagCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.tagsCollectionViewCell.rawValue)
        self.tagCollectionView.delegate = self
        self.tagCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        collectionLayout.minimumLineSpacing = 2
        collectionLayout.minimumInteritemSpacing = 2
        self.tagCollectionView.collectionViewLayout = collectionLayout
        
        let recNibName = UINib(nibName: CellNibName.categoriesCollectionViewCell.rawValue, bundle: nil)
        self.recognitionCollectionView.register(recNibName, forCellWithReuseIdentifier: CellNibName.categoriesCollectionViewCell.rawValue)
        self.recognitionCollectionView.delegate = self
        self.recognitionCollectionView.dataSource = self
        let recCollectionLayout = UICollectionViewFlowLayout()
        recCollectionLayout.minimumLineSpacing = 2
        recCollectionLayout.minimumInteritemSpacing = 2
        recCollectionLayout.scrollDirection =  isFromPeople ? .vertical : .horizontal
        self.recognitionCollectionView.collectionViewLayout = recCollectionLayout
        
        
    }
    
    @IBAction func onTapSignOut(_ sender: UIButton) {
        AppAccess.shared.logoutUserData()
        AppAccess.shared.saveSkillsData(nil)
        AppAccess.shared.saveCategoryData(nil)
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.loginViewController.rawValue) as? LoginViewController
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
    
    @IBAction func onTapBack(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
}
extension ProfileViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        //return collectionView == self.tagCollectionView ? self.user.skillTags.count : self.user.category.count
        if collectionView == self.tagCollectionView {
            return isFromPeople ? self.selectedUserApi?.skills.count ?? 0 : self.userSkills.count
        }
        return self.userCategories.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if collectionView == self.tagCollectionView {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.tagsCollectionViewCell.rawValue, for: indexPath) as! TagsCollectionViewCell
            //  cell.skillTag = self.user.skillTags[indexPath.item]
            cell.skillTag = isFromPeople ? self.selectedUserApi?.skills[indexPath.item].name ?? "" : self.userSkills[indexPath.item]
            cell.isFromHome = true
            cell.setupView()
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.categoriesCollectionViewCell.rawValue, for: indexPath) as! CategoriesCollectionViewCell
            //cell.data = self.user.category[indexPath.item]
            cell.dataApi = self.userCategories[indexPath.item]
            cell.isFromPeople = self.isFromPeople
            cell.setupView()
            return cell
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if collectionView == self.recognitionCollectionView  {
            return isFromPeople ? CGSize(width: collectionView.frame.size.width - 5 , height: 70) : CGSize(width: 300, height: collectionView.frame.size.height - 5)
        }
        return CGSize(width: 40, height: 40)
    }
}
