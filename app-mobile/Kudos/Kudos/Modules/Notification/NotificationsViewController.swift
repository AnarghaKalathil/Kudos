//
//  NotificationsViewController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class NotificationsViewController: UIViewController {

    @IBOutlet weak var notificationsCollectionView: UICollectionView!
    @IBOutlet weak var navBar: UIView!
    
    //Static Data
    let notifications: [NotificationsModel.NotificationModel] = [
        NotificationsModel.NotificationModel(date: "2025-07-11", body: "You have received a star"),
        NotificationsModel.NotificationModel(date: "2025-07-03", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-08", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-01", body: "You have received a star"),
        NotificationsModel.NotificationModel(date: "2025-07-06", body: "You have received a star"),
        NotificationsModel.NotificationModel(date: "2025-07-10", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-02", body: "You have received a star"),
        NotificationsModel.NotificationModel(date: "2025-07-09", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-05", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-12", body: "You have received a star"),
        NotificationsModel.NotificationModel(date: "2025-07-07", body: "You have a request to review"),
        NotificationsModel.NotificationModel(date: "2025-07-04", body: "You have received a star")
    ]
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setupView()
        // Do any additional setup after loading the view.
    }
    
    func setupView() {
        //Nav bar
        self.navBar.applyShadow()
        
        //Collectionview
        let nibName = UINib(nibName: CellNibName.notificationsCollectionViewCell.rawValue, bundle: nil)
        self.notificationsCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.notificationsCollectionViewCell.rawValue)
        self.notificationsCollectionView.delegate = self
        self.notificationsCollectionView.dataSource = self
        let collectionLayout = UICollectionViewFlowLayout()
        collectionLayout.minimumLineSpacing = 2
        collectionLayout.minimumInteritemSpacing = 2
        self.notificationsCollectionView.collectionViewLayout = collectionLayout

        
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
extension NotificationsViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.notifications.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.notificationsCollectionViewCell.rawValue, for: indexPath) as! NotificationsCollectionViewCell
        cell.setupView(data: self.notifications[indexPath.item])
        return cell
    }
        
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width - 5, height: 70)
    }
    
    
}

