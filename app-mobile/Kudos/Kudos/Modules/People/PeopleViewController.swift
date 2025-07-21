//
//  PeopleViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 19/07/25.
//

import UIKit

class PeopleViewController: UIViewController {
    
    //Nav Bar
    @IBOutlet weak var navBar: UIView!
    
    @IBOutlet weak var searchView: UIView!
    @IBOutlet weak var txtSearch: UITextField!
    
    @IBOutlet weak var btnBack: UIButton!
    @IBOutlet weak var peopleCollectionView: UICollectionView!
    
    var isFromRecognition = false
    var isTagSearch = false
    var selectedUser: HomeModels.UserModel?
    var didTapUser:((HomeModels.UserModel) -> Void)?
    //Static Data
    var peopleArr: [HomeModels.UserModel] = [
        HomeModels.UserModel(
            name: "Alice Johnson",
            category: [HomeModels.CategoryModel(name: "Leadership", starCount: 5, recognizedBy: ["Ravi Nair"])],
            starCount: 5,
            dept: "Engineering",
            skillTags: ["Swift", "Git", "CI/CD"]
        ),
        HomeModels.UserModel(
            name: "Bob Anderson",
            category: [HomeModels.CategoryModel(name: "Creativity & Innovation", starCount: 4, recognizedBy: ["Megha Shah"])],
            starCount: 4,
            dept: "Product Design",
            skillTags: ["React", "TypeScript", "Docker"]
        ),
        HomeModels.UserModel(
            name: "Charlie Martin",
            category: [HomeModels.CategoryModel(name: "Customer Centricity", starCount: 3, recognizedBy: ["Amit Sinha"])],
            starCount: 3,
            dept: "Customer Success",
            skillTags: ["Node.js", "Firebase", "SQL"]
        ),
        HomeModels.UserModel(
            name: "Diana Patel",
            category: [HomeModels.CategoryModel(name: "Problem Solving", starCount: 4, recognizedBy: ["Neha Rao"])],
            starCount: 4,
            dept: "Quality Assurance",
            skillTags: ["Python", "CI/CD"]
        ),
        HomeModels.UserModel(
            name: "Evan Thomas",
            category: [HomeModels.CategoryModel(name: "Collaboration & Teamwork", starCount: 5, recognizedBy: ["Alok Verma"])],
            starCount: 5,
            dept: "DevOps",
            skillTags: ["Docker", "Kubernetes"]
        ),
        HomeModels.UserModel(
            name: "Fiona Lewis",
            category: [HomeModels.CategoryModel(name: "Mentoring & Support", starCount: 3, recognizedBy: ["Sara Iyer"])],
            starCount: 3,
            dept: "Human Resources",
            skillTags: ["Git", "SQL"]
        ),
        HomeModels.UserModel(
            name: "George Kim",
            category: [HomeModels.CategoryModel(name: "Accountability & Ownership", starCount: 4, recognizedBy: ["Vinay K"])],
            starCount: 4,
            dept: "Backend Team",
            skillTags: ["Node.js", "AWS"]
        ),
        HomeModels.UserModel(
            name: "Hannah Singh",
            category: [HomeModels.CategoryModel(name: "Integrity & Trust", starCount: 5, recognizedBy: ["Nitin Kumar"])],
            starCount: 5,
            dept: "Legal & Compliance",
            skillTags: ["TypeScript", "Firebase"]
        ),
        HomeModels.UserModel(
            name: "Ian Parker",
            category: [HomeModels.CategoryModel(name: "Going the Extra Mile", starCount: 4, recognizedBy: ["Alok Verma"])],
            starCount: 4,
            dept: "IT Support",
            skillTags: ["Swift", "CI/CD"]
        ),
        HomeModels.UserModel(
            name: "Judy Ramirez",
            category: [HomeModels.CategoryModel(name: "Continuous Learning & Growth", starCount: 5, recognizedBy: ["Neha Rao"])],
            starCount: 5,
            dept: "Learning & Development",
            skillTags: ["Python", "Kubernetes"]
        )
    ]

    var filteredPeopleArr = [HomeModels.UserModel]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    //Setup view
    func setupView() {
        //Nav Bar
        self.navBar.applyShadow()
        self.btnBack.isHidden = self.isTagSearch == true ? false : true
        //Search View
        self.searchView.layer.cornerRadius = 4
        self.searchView.layer.borderColor = UIColor.lightGray.cgColor
        self.searchView.layer.borderWidth = 1
        
        
        //Reviewer
        if isFromRecognition {
            if !self.isTagSearch {
                if let data = selectedUser {
                    self.peopleArr = peopleArr.filter { $0.name != data.name }
                }
            }
        }
        
        self.filteredPeopleArr = self.peopleArr
        self.txtSearch.addTarget(self, action: #selector(textFieldDidChange(_:)), for: .editingChanged)
        if self.isTagSearch {
            self.txtSearch.placeholder = "Search tags"
        }

        //Collectionview
        let nibName = UINib(nibName: CellNibName.peopleCollectionViewCell.rawValue, bundle: nil)
        self.peopleCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.peopleCollectionViewCell.rawValue)
        self.peopleCollectionView.delegate = self
        self.peopleCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        collectionLayout.minimumLineSpacing = 2
        collectionLayout.minimumInteritemSpacing = 2
        self.peopleCollectionView.collectionViewLayout = collectionLayout
        
    }
    func filterPeople(by searchText: String) -> [HomeModels.UserModel] {
        guard !searchText.isEmpty else { return peopleArr }

        let lowercasedSearch = searchText.lowercased()

        return self.filteredPeopleArr.filter { user in
            user.skillTags.contains { tag in
                tag.lowercased().contains(lowercasedSearch)
            }
        }
    }

    @objc func textFieldDidChange(_ textField: UITextField) {
        if self.isTagSearch {
            guard let searchText = textField.text?.trimmingCharacters(in: .whitespacesAndNewlines), searchText.count >= 2 else {
                // If less than 2 characters, show full sorted list
                self.filteredPeopleArr = self.peopleArr.sorted { ($0.name ?? "") < ($1.name ?? "") }
                self.peopleCollectionView.reloadData()
                return
            }
            self.filteredPeopleArr = self.filterPeople(by: searchText)

        } else {
            guard let searchText = textField.text?.trimmingCharacters(in: .whitespacesAndNewlines), searchText.count >= 2 else {
                // If less than 2 characters, show full sorted list
                self.filteredPeopleArr = self.peopleArr.sorted { ($0.name ?? "") < ($1.name ?? "") }
                self.peopleCollectionView.reloadData()
                return
            }

            self.filteredPeopleArr = self.peopleArr.filter {
                ($0.name ?? "").lowercased().contains(searchText.lowercased())
            }.sorted { ($0.name ?? "") < ($1.name ?? "") }
        }

        self.peopleCollectionView.reloadData()
    }

    @IBAction func onTapBack(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
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

extension PeopleViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.filteredPeopleArr.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.peopleCollectionViewCell.rawValue, for: indexPath) as! PeopleCollectionViewCell
        cell.userModel = self.filteredPeopleArr[indexPath.item]
        cell.setupView(isFromRecognition: self.isFromRecognition)
        cell.didTapRecognition = { [weak self] (selectedUser) in
            let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
                .instantiateViewController(withIdentifier: NibName.giveRecognitionViewController.rawValue) as? GiveRecognitionViewController
            vc?.selectedUser = selectedUser
            self?.navigationController?.pushViewController(vc!, animated: true)
        }
        cell.didTapViewProfile = { [weak self] (selectedUser) in
            let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
                .instantiateViewController(withIdentifier: NibName.profileViewController.rawValue) as? ProfileViewController
            vc?.selectedUser = selectedUser
            vc?.isFromPeople = true
            self?.navigationController?.pushViewController(vc!, animated: true)
        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if isFromRecognition {
            if !self.isTagSearch {
                self.didTapUser?(self.filteredPeopleArr[indexPath.item])
                self.dismiss(animated: true)
            } else {
                let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
                    .instantiateViewController(withIdentifier: NibName.profileViewController.rawValue) as? ProfileViewController
                vc?.isFromPeople = true
                vc?.selectedUser = self.filteredPeopleArr[indexPath.row]
                self.navigationController?.pushViewController(vc!, animated: true)
            }
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width - 5, height: 115)
    }
    
    
}
