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

    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        self.navBar.applyShadow()
        
        self.btnTag.layer.cornerRadius = 4
        self.btnSend.layer.cornerRadius = 4
        if let data = selectedUser {
            self.lblName.text = data.name
            self.lblDept.text = data.dept
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
        
        // Set constraints
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
        vc?.selectedUser = selectedUser
        vc?.isFromRecognition = true
        vc?.didTapUser = { [weak self] (reviewer) in
            self?.txtReviewer.text = reviewer.name
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
        self.navigationController?.popViewController(animated: true)
    }
    
}

extension GiveRecognitionViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.skillTags.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.tagsCollectionViewCell.rawValue, for: indexPath) as! TagsCollectionViewCell
        cell.skillTag = self.skillTags[indexPath.item]
        cell.setupView()
//        cell.didTapRecognition = { [weak self] (selectedUser) in
//            let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main)
//                .instantiateViewController(withIdentifier: NibName.giveRecognitionViewController.rawValue) as? GiveRecognitionViewController
//            self?.navigationController?.pushViewController(vc!, animated: true)
//        }
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        self.txtSkillTag.text = self.skillTags[indexPath.item]
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
        return pickerTag == 0 ? self.categoryList.count : self.skillTags.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return pickerTag == 0 ? self.categoryList[row] : self.skillTags[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if pickerTag == 0 {
            self.txtCategory.text = self.categoryList[row]
        } else {
            self.txtSkillTag.text = self.skillTags[row]
        }
        self.pickerView.isHidden = true
    }
}
