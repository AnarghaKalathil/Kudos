//
//  TagsCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class TagsCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var cellView: UIView!
    @IBOutlet weak var lblTagName: UILabel!
    var skillTag = ""
    var isFromHome = false
    func setupView() {
        self.cellView.applyShadow()
        self.cellView.layer.cornerRadius = 4
        if isFromHome {
            self.lblTagName.text = self.getInitials(from: skillTag)
            self.cellView.layer.cornerRadius = self.lblTagName.frame.size.height/2
            self.cellView.backgroundColor = .white
        } else {
            self.lblTagName.text = skillTag
        }
    }
    
    func getInitials(from name: String) -> String {
        let components = name
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .components(separatedBy: .whitespaces)
            .filter { !$0.isEmpty }

        guard let first = components.first else { return "" }
        return "\(first.first!)".uppercased()
    }
}
