USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Get_Login_History]    Script Date: 09-05-2024 11:04:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_Get_Login_History]
     @Field NVARCHAR(50) = 'date', --code
    @Sort NVARCHAR(50) = 'desc', -- asc
    @Page BIGINT = 1,
    @PageSize BIGINT = 10,
	@Text NVARCHAR(MAX)='',
	@UserIds nvarchar(MAX) = '',
	@BrowserIds nvarchar(max)='',
	@OsIds nvarchar(max)='',
	@DeviceIds nvarchar(max) ='',
	@FromDate date = '',
	@ToDate date = ''
AS
BEGIN

DROP TABLE IF EXISTS #tempLoginHistory
 

	SELECT lh.Id
	INTO #tempLoginHistory
	FROM LoginHistories lh
	 inner join AspNetUsers a on a.Id = lh.UserId
	WHERE (@UserIds = '' OR lh.UserId in (SELECT value FROM STRING_SPLIT(@UserIds, ','))) 
	AND (@BrowserIds = '' OR lh.Browser in (SELECT value FROM STRING_SPLIT(@BrowserIds, ','))) 
	AND (@OsIds = '' OR lh.OS in (SELECT value FROM STRING_SPLIT(@OsIds, ',')))   
	AND (@Text = '' OR (a.Email LIKE '%'+@Text+'%') )
	AND ((@FromDate = '' AND @ToDate = '') OR (@ToDate = '' AND lh.DateTime >= @FromDate) OR(@FromDate = @ToDate AND CONVERT(DATE, lh.DateTime) = @FromDate) OR (lh.DateTime BETWEEN @FromDate AND DATEADD(DAY, 1, @ToDate)))	
	GROUP BY lh.Id

   -- It returns number of users after applying filters.
   SELECT Count(*) AS count FROM #tempLoginHistory

   -- it returns all data for users from #tempLoginHistory
    SELECT 
    ROW_NUMBER() OVER (Order By 
	 CASE WHEN @Field = 'email' AND @Sort = 'asc' THEN a.Email END ASC,
                CASE WHEN @Field = 'email' AND @Sort = 'desc' THEN a.Email END DESC,
                CASE WHEN @Field = 'date' AND @Sort = 'asc' THEN lh.datetime END ASC,
                CASE WHEN @Field = 'date' AND @Sort = 'desc' THEN lh.datetime END DESC,
                CASE WHEN @Field = 'ipAddress' AND @Sort = 'asc' THEN lh.ipAddress END ASC,
                CASE WHEN @Field = 'ipAddress' AND @Sort = 'desc' THEN lh.ipAddress END DESC,
                CASE WHEN @Field = 'browser' AND @Sort = 'asc' THEN lh.browser END ASC,
                CASE WHEN @Field = 'browser' AND @Sort = 'desc' THEN lh.browser END DESC,
				CASE WHEN @Field = 'os' AND @Sort = 'asc' THEN lh.OS END ASC,
                CASE WHEN @Field = 'os' AND @Sort = 'desc' THEN lh.OS END DESC

     )
     AS Id ,a.Id AS UserId,a.Email,lh.DateTime,lh.IpAddress,lh.Browser,lh.OS,lh.Device
	 FROM AspNetUsers a
	 INNER JOIN LoginHistories lh ON a.Id = lh.UserId
	 INNER JOIN #tempLoginHistory tlh ON tlh.Id = lh.Id	
	 order by Id
    OFFSET (@Page-1) * @pageSize ROWS FETCH NEXT @pagesize ROWS ONLY

END
GO

