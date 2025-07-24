//
//  GiveRecognitionViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit


class GiveRecognitionViewController: UIViewController, UITextViewDelegate {
    
    //Nav Bar
    @IBOutlet weak var navBar: UIView!
    
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblDept: UILabel!
    @IBOutlet weak var txtCategory: UITextField!
    @IBOutlet weak var txtViewComments: UITextView!
    @IBOutlet weak var txtSkillTag: UITextField!
    @IBOutlet weak var btnTag: UIButton!
    @IBOutlet weak var suggestedTagCollectionView: UICollectionView!
    @IBOutlet weak var txtReviewer: UITextField!
    @IBOutlet weak var btnSend: UIButton!
    
    @IBOutlet weak var pickerView: UIPickerView!
    @IBOutlet weak var suggestedCollectionViewHeight: NSLayoutConstraint!
    var selectedUser: HomeModels.UserModel?
    var selectedUserApi: PeopleModel.Recognitions?
    let placeholderLabel = UILabel()
    var pickerTag = 0
    //Static Data
    let skillTags: [String] = [
        "Swift",
        "React",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Git",
        "SQL",
        "Firebase",
        "AWS",
        "TypeScript",
        "Python",
        "CI/CD"
    ]
    
    let categoryList: [String] = [
        "Leadership",
        "Mentoring & Support",
        "Creativity & Innovation",
        "Collaboration & Teamwork",
        "Accountability & Ownership",
        "Customer Centricity",
        "Problem Solving",
        "Going the Extra Mile",
        "Integrity & Trust",
        "Continuous Learning & Growth"
    ]
    var reviewerId = 0
    var selectedCategoryId = 0
    var selectedSkillsId = 0
    var skills = [SkillModels.SkillData]()
    var caetogeries = [CategoryModel.Category]()
    override func viewDidLoad() {
        super.viewDidLoad()
        AppAccess.shared.loadSkillsData()
        AppAccess.shared.loadCategoryData()
        AppAccess.shared.loadUserData()
        self.skills = AppAccess.shared.skills?.data ?? []
        self.caetogeries = AppAccess.shared.categories?.data ?? []
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        self.navBar.applyShadow()
        
        self.btnTag.layer.cornerRadius = 4
        self.btnSend.layer.cornerRadius = 4
        //        if let data = selectedUser {
        //            self.lblName.text = data.name
        //            self.lblDept.text = data.dept
        //        }
        if let data = selectedUserApi {
            self.lblName.text = data.name
            self.lblDept.text = data.designation
        }
        self.pickerView.isHidden = true
        self.pickerView.delegate = self
        self.pickerView.dataSource = self
        //Collectionview
        let nibName = UINib(nibName: CellNibName.tagsCollectionViewCell.rawValue, bundle: nil)
        self.suggestedTagCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.tagsCollectionViewCell.rawValue)
        self.suggestedTagCollectionView.delegate = self
        self.suggestedTagCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        self.suggestedTagCollectionView.collectionViewLayout = collectionLayout
        let rows = ceil(CGFloat(self.skillTags.count) / CGFloat(3))
        let collectionHeight = rows * 40 + (rows - 1) * 2
        self.suggestedCollectionViewHeight.constant = collectionHeight
        
        //Textview
        self.txtViewComments.delegate = self
        
        // Configure placeholder
        self.placeholderLabel.text = "Share what they did and how it helped you."
        self.placeholderLabel.font = self.txtViewComments.font
        self.placeholderLabel.textColor = .lightGray
        self.placeholderLabel.translatesAutoresizingMaskIntoConstraints = false
        self.txtViewComments.addSubview(placeholderLabel)
        self.txtViewComments.layer.borderColor = UIColor.lightGray.cgColor
        self.txtViewComments.layer.borderWidth = 0.5
        self.txtViewComments.layer.cornerRadius = 4
        
//        // Set constraints
        NSLayoutConstraint.activate([
            self.placeholderLabel.topAnchor.constraint(equalTo: self.txtViewComments.topAnchor, constant: 8),
            self.placeholderLabel.leadingAnchor.constraint(equalTo: self.txtViewComments.leadingAnchor, constant: 5)
        ])
        
        // Show/hide placeholder based on text
        self.placeholderLabel.isHidden = !self.txtViewComments.text.isEmpty
        
    }
    func textViewDidChange(_ textView: UITextView) {
        placeholderLabel.isHidden = !textView.text.isEmpty
    }
    
    @IBAction func onTapBack(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
    }
    @IBAction func onTapAddTag(_ sender: UIButton) {
        self.pickerTag = 1
        self.pickerView.reloadAllComponents()
        self.pickerView.isHidden = false
    }
    @IBAction func onTapSelectCategory(_ sender: UIButton) {
        self.pickerTag = 0
        self.pickerView.reloadAllComponents()
        self.pickerView.isHidden = false
    }
    @IBAction func onTapSelectReviewer(_ sender: UIButton) {
        let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
            .instantiateViewController(withIdentifier: NibName.peopleViewController.rawValue) as? PeopleViewController
        //vc?.selectedUser = selectedUser
        vc?.selectedUserApi = selectedUserApi
        vc?.isFromRecognition = true
        vc?.didTapUser = { [weak self] (reviewer) in
            self?.txtReviewer.text = reviewer.name
            self?.reviewerId = reviewer.userId ?? 0
        }
        self.navigationController?.present(vc!, animated: true)
    }
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destination.
     // Pass the selected object to the new view controller.
     }
     */
    @IBAction func onTapSend(_ sender: UIButton) {
        Loader.shared.show(on: self.view)
        let request = RequestModels.RecognitionReq(sender: AppAccess.shared.user?.userId,
                                                   receiver: self.selectedUserApi?.userId,
                                                   category: self.selectedCategoryId,
                                                   message: self.txtViewComments.text,
                                                   skills: [self.selectedSkillsId],
                                                   reviewer: self.reviewerId)
        print(request)
        performAddRecognitionApi(RecReqModel: request) { success, response in
            let alert = UIAlertController(title: "Kudos", message: response?.message, preferredStyle: .alert)
            let okAction = UIAlertAction(title: "OK", style: .default) { _ in
                alert.dismiss(animated: true)
                self.navigationController?.popViewController(animated: true)
            }
            alert.addAction(okAction)
            Loader.shared.hide()
            self.present(alert, animated: true, completion: nil)
        }
        
    }
    
}

extension GiveRecognitionViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 6
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.tagsCollectionViewCell.rawValue, for: indexPath) as! TagsCollectionViewCell
        cell.skillTag = self.skills[indexPath.item].name ?? ""
        cell.setupView()
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        self.txtSkillTag.text = self.skills[indexPath.item].name ?? ""
        self.selectedSkillsId = self.skills[indexPath.item].id ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: 70, height: 40)
    }
}

extension GiveRecognitionViewController: UIPickerViewDelegate, UIPickerViewDataSource {
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerTag == 0 ? self.caetogeries.count : self.skills.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return pickerTag == 0 ? self.caetogeries[row].name : self.skills[row].name
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if pickerTag == 0 {
            self.txtCategory.text = self.caetogeries[row].name
            self.selectedCategoryId = self.caetogeries[row].id
        } else {
            self.txtSkillTag.text = self.skills[row].name
            self.selectedSkillsId = self.skills[row].id ?? 0
        }
        self.pickerView.isHidden = true
    }
}
