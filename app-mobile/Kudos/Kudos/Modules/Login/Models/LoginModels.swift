//
//  LoginModels.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 21/07/25.
//

enum LoginModels {
    struct LoginRequest: ParameterConvertible {
        var email: String?
        var password:String?
    }
    struct LoginResponse: ParameterConvertible {
        var data: UserData
        var message: String?
        var status: Bool?
    }

    struct UserData: ParameterConvertible {
        var userId: Int?
        var username: String?
        var email: String?
        var userData: UserDetails
        var accessToken: String?
        var refreshToken: String?
    }

    struct UserDetails: ParameterConvertible {
        var lastLogin: String?
        var isSuperuser: Bool?
        var isActive: Bool?
        var dateJoined: String?
        var designation: String?
    }
}
