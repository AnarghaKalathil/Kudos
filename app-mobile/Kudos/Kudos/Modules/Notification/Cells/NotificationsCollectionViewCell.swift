//
//  NotificationsCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class NotificationsCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var lblBody: UILabel!
    @IBOutlet weak var lblDate: UILabel!
    @IBOutlet weak var cellView: UIView!
    
    func setupView(data: NotificationsModel.NotificationModel) {
        self.cellView.applyShadow()
        
        self.lblBody.text = data.body
        self.lblDate.text = data.date
    }
    
}
