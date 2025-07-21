//
//  RequestsCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class RequestsCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var cellView: UIView!
    @IBOutlet weak var lblIcon: UILabel!
    
    @IBOutlet weak var lblName: UILabel!
    
    @IBOutlet weak var lblDate: UILabel!
    
    @IBOutlet weak var lblStatus: UILabel!
    
    var reqData: RequestModels.ReqModel?
    
    func setupView() {
        self.cellView.applyShadow()
        
        if let data = self.reqData {
            self.lblIcon.text = self.getInitials(from: data.forName ?? "")
            self.lblIcon.layer.cornerRadius = self.lblIcon.frame.size.height/2
            self.lblIcon.clipsToBounds = true
            self.lblName.text = "Request from: \(data.fromName ?? "")"
            self.lblDate.text = data.date
            self.lblStatus.text = data.status
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

}
