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
    
    @IBOutlet weak var bg: UIImageView!
    @IBOutlet weak var lblName: UILabel!
    
    @IBOutlet weak var lblDate: UILabel!
    
    @IBOutlet weak var lblStatus: UILabel!
    
    var reqDataApi: HomeModels.RecognitionItem?
    
    func setupView() {
        self.cellView.applyShadow()
        self.bg.layer.cornerRadius = self.bg.frame.height/2
        self.bg.clipsToBounds = true

        if let data = self.reqDataApi {
            self.lblIcon.text = self.getInitials(from: data.receiver ?? "")
            self.lblIcon.layer.cornerRadius = self.lblIcon.frame.size.height/2
            self.lblIcon.clipsToBounds = true
            self.lblName.text = "Request from: \(data.sender ?? "")"
            self.lblDate.text = formatDateOnly(from: data.created_at ?? "")
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
    func formatDateOnly(from isoString: String) -> String {
        let inputFormatter = ISO8601DateFormatter()
        inputFormatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]

        if let date = inputFormatter.date(from: isoString) {
            let outputFormatter = DateFormatter()
            outputFormatter.dateFormat = "dd MMM yyyy" // Customize this format as needed
            outputFormatter.locale = Locale.current
            return outputFormatter.string(from: date)
        } else {
            return "Invalid Date"
        }
    }

}
