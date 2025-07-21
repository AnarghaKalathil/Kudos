//
//  LeaderboardCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 19/07/25.
//

import UIKit

class LeaderboardCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var lblIcon: UILabel!
    @IBOutlet weak var lblName: UILabel!
    @IBOutlet weak var lblCategory: UILabel!
    @IBOutlet weak var lblStarCount: UILabel!
    @IBOutlet weak var cellView: UIView!
    
    func setupView(data: HomeModels.UserModel) {
        self.cellView.applyShadow()
        self.lblIcon.text = self.getInitials(from: data.name ?? "")
        self.lblIcon.layer.cornerRadius = self.lblIcon.frame.height/2
        self.lblIcon.clipsToBounds = true
        self.lblName.text = data.name
        self.lblCategory.text = data.category[0].name
        self.lblStarCount.text = "\(data.starCount ?? 0)"
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

}
