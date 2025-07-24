//
//  CategoriesCollectionViewCell.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 20/07/25.
//

import UIKit

class CategoriesCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var lblStarCount: UILabel!
    @IBOutlet weak var cellView: UIView!
    @IBOutlet weak var lblCategory: UILabel!
    @IBOutlet weak var recognitionCollectionView: UICollectionView!
    var data: HomeModels.CategoryModel?
    var dataApi: CategoryModel.UserCategory?
    var isFromPeople = false
    func setupView() {
        self.cellView.applyShadow()
        
        self.lblCategory.text = dataApi?.name ?? ""
       // self.lblStarCount.text = "\(dataApi?.starCount ?? 0)"
        self.lblStarCount.text = "\(dataApi?.count ?? 0)"
        self.recognitionCollectionView.isHidden = isFromPeople ? true : false
        //Collectionview
        if !isFromPeople {
            let nibName = UINib(nibName: CellNibName.recognitionCollectionViewCell.rawValue, bundle: nil)
            self.recognitionCollectionView.register(nibName, forCellWithReuseIdentifier: CellNibName.recognitionCollectionViewCell.rawValue)
            self.recognitionCollectionView.delegate = self
            self.recognitionCollectionView.dataSource = self
            let collectionLayout = UICollectionViewFlowLayout()
            collectionLayout.minimumLineSpacing = 2
            collectionLayout.minimumInteritemSpacing = 2
            self.recognitionCollectionView.collectionViewLayout = collectionLayout
        }
    }
}

extension CategoriesCollectionViewCell: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.dataApi?.senders.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: CellNibName.recognitionCollectionViewCell.rawValue, for: indexPath) as! RecognitionCollectionViewCell
        cell.setupView(name: self.dataApi?.senders[indexPath.item] ?? "")
        return cell
    }
        
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width - 5, height: 60)
    }
    
    
}
