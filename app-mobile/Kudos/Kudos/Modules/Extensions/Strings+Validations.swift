//
//  Strings+Validations.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 17/07/25.
//

enum NibName: String {
    case loginViewController = "LoginViewController"
    case homeViewController = "HomeViewController"
    case peopleViewController = "PeopleViewController"
    case giveRecognitionViewController = "GiveRecognitionViewController"
    case requestsViewController = "RequestsViewController"
    case requestDetailViewController = "RequestDetailViewController"
    case profileViewController = "ProfileViewController"
    case notificationsViewController = "NotificationsViewController"
    case tabbarController = "TabbarController"
}

enum CellNibName: String {
    case leaderboardCollectionViewCell = "LeaderboardCollectionViewCell"
    case peopleCollectionViewCell = "PeopleCollectionViewCell"
    case tagsCollectionViewCell = "TagsCollectionViewCell"
    case requestsCollectionViewCell = "RequestsCollectionViewCell"
    case recognitionCollectionViewCell = "RecognitionCollectionViewCell"
    case categoriesCollectionViewCell = "CategoriesCollectionViewCell"
    case notificationsCollectionViewCell = "NotificationsCollectionViewCell"
}

enum BaseUrl : String {
    case BASE_URL = "http://140.245.218.8/api/"
}

enum ApiEndPoints : String {
    case login = "accounts/api/login/"
    case dashboard = "dashboard/api/dashboard/"
    case skills = "admin-dashboard/api/skills/"
    case people = "dashboard/api/teams/"
    case category = "admin-dashboard/api/categories/"
    case addRecognition = "dashboard/api/recognition/"
    case profile = "dashboard/api/profile"
    case recognitionStatus = "dashboard/api/recognition/status"
}
