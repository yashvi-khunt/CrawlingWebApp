USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Get_Users_With_Names]    Script Date: 09-05-2024 11:06:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Get_Users_With_Names]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id AS 'Value',
           FirstName + ' ' + LastName AS 'Label'
    FROM AspNetUsers
    WHERE (FirstName != '' or LastName !='')
END
GO

