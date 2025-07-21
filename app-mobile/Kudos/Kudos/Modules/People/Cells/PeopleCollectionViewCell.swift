//
//  PeopleCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 19/07/25.
//

import UIKit

class PeopleCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var lblIcon: UILabel!
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblDept: UILabel!
    @IBOutlet weak var cellView: UIView!
    
    @IBOutlet weak var btnViewProfile: UIButton!
    @IBOutlet weak var btnRecognize: UIButton!
    
    var userModel: HomeModels.UserModel?
    var didTapRecognition:((HomeModels.UserModel) -> Void)?
    var didTapViewProfile:((HomeModels.UserModel) -> Void)?
    func setupView(isFromRecognition: Bool) {
        if let data = userModel {
            self.cellView.applyShadow()
            self.lblIcon.text = self.getInitials(from: data.name ?? "")
            self.lblIcon.layer.cornerRadius = self.lblIcon.frame.height/2
            self.lblIcon.clipsToBounds = true
            self.lblName.text = data.name
            self.lblDept.text = data.dept
        }
        self.btnRecognize.layer.cornerRadius = 4
        self.btnViewProfile.layer.cornerRadius = 4
        if isFromRecognition {
            self.btnRecognize.isHidden = true
            self.btnViewProfile.isHidden = true
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

    
    @IBAction func onTapViewProfile(_ sender: UIButton) {
        if let data = self.userModel {
            self.didTapViewProfile?(data)
        }
    }
    
    
    @IBAction func onTapRecognize(_ sender: UIButton) {
        if let data = self.userModel {
            self.didTapRecognition?(data)
        }
    }
    
    
}
